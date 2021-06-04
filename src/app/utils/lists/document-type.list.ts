import { DocumentType } from "../enums/document-type.enum";

export class DocumentTypeList {

  public CPF = { id: DocumentType.CPF, name: 'CPF' };
  public CNPJ = { id: DocumentType.CNPJ, name: 'CNPJ' };

  public getAllDocumentTypes(): any {

    return [this.CPF, this.CNPJ];
  }
}
