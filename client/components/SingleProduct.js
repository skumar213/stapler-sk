// eslint-disable-next-line no-unused-vars
import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const singleProduct = (props) => {

  const product = props.product
  const {id, name, description, imgUrl, quantity, inStock} = product
  const linkDestination = `/products/${id}`


  return (
    <div>
      <h3>Product Name: {name}</h3>
      <img src={imgUrl} />
      <Link to={linkDestination}>
        <button type="button" >VIEW PRODUCT</button>
      </Link>
      <br />
      <p>
        description: {description} <br />
        quantity: {quantity} <br />
        itemNumber: {id} <br />
        inStock: {inStock ? 'true' : 'false'} <br />
      </p>
    </div>
  )
}

export default singleProduct;
