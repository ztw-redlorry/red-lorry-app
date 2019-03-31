import { ADD_TO_ORDERS } from "./../actions/orders";

const orderReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_TO_ORDERS: {
            const { orderTile } = action;
            return [...state, orderTile];
        }
        default: {
            return state;
        }
    }
};

export default orderReducer;
