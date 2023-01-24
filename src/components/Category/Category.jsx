import { useEffect, useState } from "react";
import { GET } from "../../http/http";
import { Loader } from "../Loader/Loader";
import styles from "./styles.module.scss";

export function Category() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    GET("categories").then((res) => {
      setCategories(res);
      setLoading(false);
    });
  }, []);
  return (
    <div className={styles.main}>
      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : (
        <>
          <div className={styles.top_bar}>
            <div>
              <h3>Gestisci le categorie</h3>
              <button>Crea nuova categoria</button>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Foto</th>
                <th>Nome</th>
                <th>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((item) => {
                const { id, name, image } = item;
                return (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>
                      <img src={image} alt="immagine" />
                    </td>
                    <td>{name.slice(0, 10)}</td>
                    <td className={styles.actions_td}>
                      <div>
                        <button className={styles.edit_btn}>Edit</button>
                        <button className={styles.remove_btn}>Delete</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
