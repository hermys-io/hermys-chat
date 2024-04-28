FROM node:20-slim as base_image

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

COPY . /app
WORKDIR /app

FROM base_image AS prod_deps_image
RUN --mount=type=cache,id=171daf62-da24-48c4-a135-5eab0172da4c,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base_image AS build_image
RUN --mount=type=cache,id=171daf62-da24-48c4-a135-5eab0172da4c,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

FROM base_image
COPY --from=prod_deps_image /app/node_modules /app/node_modules
COPY --from=build_image /app/.next /app/.next
EXPOSE 3000

CMD [ "pnpm", "start" ]
