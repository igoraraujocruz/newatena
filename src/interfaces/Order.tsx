export interface Order {
    id: string,
    name: string;
    unimedProtocol: string;
    unimedCard: string;
    typeOfHospitalization: string;
    sex: string;
    room: string;
    roomRequest:[ 
      {
        id: string;
        room: string;
        message: string;
        isClean: boolean;
        user_id: string;
        order_id: string;
        hotel_management_user_id: string;
        createdAt: string;
        updatedAt: string;
      }]
    createdAt: string;
    requester: string;
    orderHistories: [
      {
        id: string;
        message: string;
        user_id: string;
        createdAt: string;
      }
    ];
  }