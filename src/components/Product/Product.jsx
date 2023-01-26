import { useEffect, useState } from "react";
import { DELETE, GET, PUT } from "../../http/http";
import { Loader } from "../Loader/Loader";
import styles from "./styles.module.scss";

export function Product() {
  const [products, setProduct] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const [form, setForm] = useState({
    id: null,
    title: "",
    price: "",
  });

  const fetchData = () => {
    setLoading(true);
    GET("products").then((res) => {
      const slicedRes = res.slice(0, 20);
      setProduct(slicedRes);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateData = (e, id) => {
    e.preventDefault();
    PUT("products", form, id).then((res) => {
      if (res.status === 200) {
        console.log("Updated");
      }
      setForm({ title: "", price: "" });
      fetchData();
    });
  };

  const deleteData = (id) => {
    DELETE("products", id).then(() => {
      fetchData();
    });
  };

  const onHandleForm = (input, e) => {
    setForm({ ...form, [input]: e.target.value });
  };

  return (
    <div className={styles.main}>
      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : (
        <div className={styles.products_container}>
          {products.map((product) => {
            const { id, images, title, price } = product;
            return (
              <div className={styles.card} key={id}>
                <img src={images[0]} alt="immagine" />
                {form.id === id ? (
                  <>
                    <form>
                      <input
                        value={form.title}
                        onChange={(e) => onHandleForm("title", e)}
                      />
                      <input
                        value={form.price}
                        onChange={(e) => onHandleForm("price", e)}
                      />
                      <div>
                        <button
                          className={styles.save_btn}
                          onClick={(e) => updateData(e, id)}
                        >
                          Salva
                        </button>
                        <button
                          className={styles.abort_btn}
                          onClick={(e) =>
                            setForm({ id: null, title: "", price: "" })
                          }
                        >
                          Annulla
                        </button>
                      </div>
                    </form>
                  </>
                ) : (
                  <>
                    <p className={styles.title}>{title}</p>
                    <p>{price}</p>
                    <div>
                      <button
                        className={styles.edit_btn}
                        onClick={() =>
                          setForm({
                            id: id,
                            title: title,
                            price: price,
                          })
                        }
                      >
                        Modifica
                      </button>
                      <button
                        className={styles.delete_btn}
                        onClick={() => deleteData(id)}
                      >
                        Elimina
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
