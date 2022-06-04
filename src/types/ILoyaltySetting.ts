export default interface ILoyaltySetting {
  id: number;
  title: string;
  hasPrivateCard: boolean;
  hasBirthdayGift: boolean;
  hasEventTicket: boolean;
  isVip: boolean;

  pointGainPerItem: number;
  pointRequirement: number;
}
