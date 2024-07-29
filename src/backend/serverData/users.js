export const users = [
  {
    id: "user1",
    role: "user",
    email: "user@user.com",
    username: "CreativeUsername",
    password: "1234",
    first_name:"User",
    last_name:"Userson",
    address: "Street 22",
    city: "Userstad",
    country: "Userland",
    county: "Usershire",
    zip_code: 66618,
    order_history: [
      {
        order_id: "#4454218",
        order_date: "2023-11-28",
        orders: [
          {
            product: "De vilda CD",
            price: 180,
            quantity: 1,
          },
          {
            product: "När världen faller LP",
            price: 250,
            quantity: 1,
          }
        ]
      },
      {
        order_id: "#4253259",
        order_date: "2023-09-13",
        orders: [
          {
            product: "Blåräv Patch #1",
            price: 50,
            quantity: 3,
          },
        ]
      }
    ]
  },
  {
    id: "admin",
    role: "admin",
    username: "admin",
    password: "4321",
  }
];