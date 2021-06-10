export class DashboardCard {

  public title: string;
  public styleClass: string;
  public icon: string;
  public route: string;
  public mainMetric: any;
  public secondaryMetric: any;

  constructor(
    title: string,
    styleClass: string,
    icon: string,
    route: string,
    mainMetric: any,
    secondaryMetric: any
  ) {
    this.title = title;
    this.styleClass = styleClass;
    this.icon = icon;
    this.route = route;
    this.mainMetric = mainMetric;
    this.secondaryMetric = secondaryMetric;
  }
}
