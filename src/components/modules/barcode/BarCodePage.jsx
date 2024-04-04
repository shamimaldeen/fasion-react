import React from 'react';
import Barcode from "react-barcode";

const BarCodePage = React.forwardRef((props,ref) => {

    return (
        <div className="print-area" ref={ref} style={{width:props.paperSize.a4.width,height:props.paperSize.a4.height}}>
            {
                props.products.map((product,index)=>(
                    <div className={'barcode-items'} key={index}>
                        <span><strong>{product.name}</strong></span> <br/>
                        <span> Price : {product?.selling_price?.discount != 0 ? product?.selling_price?.price + product?.selling_price?.symbol:'' } <span className={product?.selling_price?.discount != 0 ? 'deleted ms-1':''}> {product.price}</span></span>
                        <div className="barcode">
                            <Barcode value={product.sku} width={1} height={50} fontSize={10} />
                        </div>
                    </div>
                ))
            }
        </div>
    )

})


export default BarCodePage;