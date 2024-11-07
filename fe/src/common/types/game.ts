export interface IGame {
    game_id?: number,
    brand_id?: number,
    category_id?: number,
    name?: string,
    description?: string
    price?: number,
    brand_ids: [(number)],
    discount?: number,
    platform?: string,
    rating?: number,
    image?: string
}


