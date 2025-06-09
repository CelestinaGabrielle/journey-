export class TouchPoint {
  //Representa um ponto de contato com o cliente
  constructor(
    public utmSource: string,
    public utmCampaign: string,
    public utmMedium: string,
    public utmContent: string,
    public channel: string,
    public createdAt: string
  ) {}
}
