export interface IOrder {
    order_id?: number,
    user_id?: number,
    payment_method_id?: number,
    game_id?: number,
    total_price?: number,
    status?: string,
    quantity?: number,
}