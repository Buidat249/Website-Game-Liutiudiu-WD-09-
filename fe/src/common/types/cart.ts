export interface ICart {
    cart_id?: number;
    user_id?: number;
    game_id?: Array<{ game_id: number; quantity: number }>;  // Cập nhật thành mảng các đối tượng
  }
  