export default interface ComplaintResponse {
  id: number;
  timestamp: Date;
  centerId: number;
  centerName: string;
  guiltyId: number;
  guiltyName: string;
  adminId: number;
  adminName: string;
  text: string;
  answer: string;
}
