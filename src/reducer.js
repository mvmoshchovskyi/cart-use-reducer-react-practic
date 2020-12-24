const reducer = (state, action) => {
    switch (action.type) {
        case 'CLEAR_CART' :
            return {...state, cart: []}
        case 'REMOVE' :
            return {...state, cart: state.cart.filter(items => items.id !== action.payload)}
        case 'INCREASE' :
            let tempArr = state.cart.map(item => {
                if (item.id === action.payload) {
                    return {...item, amount: item.amount + 1}
                }
                return item
            })
            return {...state, cart: tempArr}
        case 'DECREASE' :
            let tempDec = state.cart.map(item => {
                if (item.id === action.payload) {
                    return {...item, amount: item.amount - 1}
                }
                return item
            }).filter(item => item.amount !== 0)
            return {...state, cart: tempDec}
        case 'GET_TOTALS':
            let {total, amount} = state.cart.reduce(
                (acc, item) => {
                    const {price, amount} = item
                    const itemTotal = price * amount

                    acc.total += itemTotal
                    acc.amount += amount
                    return acc
                },
                {total: 0, amount: 0})
            total = parseFloat(total.toFixed(2))
            return {...state, total, amount}
        case 'LOADING':
            return {...state,loading:true}
        case 'DISPLAY_ITEMS':
            return {...state,cart:action.payload, loading:false }
        default:
            return state
    }
}
export default reducer

