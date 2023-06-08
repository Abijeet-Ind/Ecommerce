
export default function Card({data}) {
  console.log(data)
  const baseUrl = "http://127.0.0.1:8000"
  return (
    <div className="items-display">
        <div className="items-image">
          <img src={`${baseUrl}/${data.image}`} alt="" />
        </div>
        <div className="product-information">
          <div className="price-x-name">
            <span>{data.product}</span> <span>${data.productPrice}</span>
          </div>
          <div className="buy-x-cart">
            <button>Buy</button> <button>Cart</button>
          </div>
        </div>
    </div>
  )
}
