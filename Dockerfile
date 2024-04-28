FROM node:20-slim as base_image

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Env variables
ARG POSTHOG_KEY
ARG POSTHOG_HOST

RUN corepack enable

COPY . /app
WORKDIR /app

FROM base_image AS prod_deps_image
RUN pnpm install --prod --frozen-lockfile
# RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base_image AS build_image
RUN pnpm install --frozen-lockfile
# RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

FROM base_image
COPY --from=prod_deps_image /app/node_modules /app/node_modules
COPY --from=build_image /app/.next /app/.next
EXPOSE 3000

CMD [ "pnpm", "start" ]
