export class ReportTypeList {

  public history = { id: 1, name: 'Extrato' };
  public total = { id: 2, name: 'Total de receitas' };

  public getAllReportsTypes(): any {

    return [this.history, this.total];
  }
}
