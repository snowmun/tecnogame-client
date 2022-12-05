
export const addCart = (product, products, setProducts) => {

    const getBod = JSON.parse(localStorage.getItem('products')) || [];

    for (const iterator of getBod) {

        if (iterator._id === product._id) {

            const cant = iterator.cant + 1;

            if (getBod.length === 1) {


                const addArray = [{ ...product, cant }];

                setProducts(addArray);

                localStorage.setItem('products', JSON.stringify(addArray));

                return;
            }

            for (const iterator2 of products) {

                if (iterator2._id === product._id) {

                    iterator2.cant = cant;

                    setProducts([...products]);

                    localStorage.setItem('products', JSON.stringify([...products]));

                    return;
                }
            }


        }

    }

    setProducts([...products, product]);

    localStorage.setItem('products', JSON.stringify([...products, product]));

}