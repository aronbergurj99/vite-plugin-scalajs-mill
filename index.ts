import type { Plugin as VitePlugin } from "vite";
import { resolve } from 'path'

export interface ScalaJSMillPluginOptions {
  moduleNames?: string;
  taskName?: string;
}

export default function scalaJSMillPlugin(
  options: ScalaJSMillPluginOptions = {}
): VitePlugin {
  const { moduleNames, taskName } = options;

  const URIPrefix = 'scalajs:';

  let isDev: boolean | undefined = undefined;
  let outputDir: undefined | string = undefined

  return {
    name: "scalajs:mill-scalajs-plugin",

    configResolved(resolvedConfig) {
      isDev = resolvedConfig.mode === "development";
    },

    async buildStart(options) {
      if (isDev === undefined)
        throw new Error("configResolved must be called before buildStart");



        let taskDest = isDev ? "fastLinkJS.dest" : "fullLinkJS.dest";
        if (taskName) {
          taskDest = `${taskName}.dest`
        }

        const paths = ["out"]
        if (moduleNames) {
          paths.push(moduleNames)
        }


        paths.push(taskDest)

        outputDir = resolve(...paths)
    },

    resolveId(source, importer, options) {
      if (outputDir === undefined)
        throw new Error("buildStart must be called before resolveId");
      if (!source.startsWith(URIPrefix))
        return null;

      const path = source.substring(URIPrefix.length)
      return `${outputDir}/${path}`
    },
  };
}
