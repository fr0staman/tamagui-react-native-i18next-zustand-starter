import { config } from "@my/config";

export type Conf = typeof config

declare module "@my/ui" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface TamaguiCustomConfig extends Conf {}
}
