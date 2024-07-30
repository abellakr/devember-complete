// import withRemoveiOSNotificationEntitlement from "./config-plugins/withRemoveiOSNotificationEntitlement";

type Dict = { [key: string]: any };
export default ({ config }: Dict) => {
  return {
    ...config,
    // plugins: [
    //   ...(config.plugins ?? []),
    //   [withRemoveiOSNotificationEntitlement],
    // ],
    updates: {
      url: "https://u.expo.dev/9a274e70-819b-4b8b-b860-435d277623ae",
    },
    runtimeVersion: {
      policy: "appVersion",
    },
  };
};
