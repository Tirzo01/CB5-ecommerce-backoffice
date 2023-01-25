import styles from "./styles.module.scss";

import { POST, PUT } from "../../http/http";
import { useEffect, useState } from "react";

export function CategoryForm({
  type,
  setModalActive,
  fetchData,
  id,
  nameToEdit,
  imageToEdit,
}) {
  const [dataName, setDataName] = useState("");
  const [dataImage, setDataImage] = useState("");

  useEffect(() => {
    if (id != undefined && id != null) {
      setDataName(nameToEdit);
      setDataImage(imageToEdit);
    }
  }, []);

  const insertData = (e) => {
    e.preventDefault();
    if (dataName.length == 0 && dataImage.length == 0) return;
    const newCategory = {
      name: dataName,
      image: dataImage,
    };
    POST("categories", newCategory).then((res) => {
      if (res.status == 201) {
        setModalActive(false);
      }
      fetchData();
    });
  };

  const updateData = (e) => {
    e.preventDefault();
    if (dataName.length == 0 && dataImage.length == 0) return;
    const updatedCategory = {
      name: dataName,
      image: dataImage,
    };
    PUT("categories", updatedCategory, id).then((res) => {
      console.log(updatedCategory);
      if (res.status == 200) {
        setModalActive(false);
      }
      fetchData();
    });
  };

  return (
    <div className={styles.main}>
      <form>
        {type === "create" && (
          <>
            <div>
              <label>Nome</label>
              <input
                placeholder="Nome..."
                onChange={(e) => setDataName(e.target.value)}
              ></input>
            </div>
            <div>
              <label>Immagine</label>
              <input
                placeholder="Url immagine..."
                onChange={(e) => setDataImage(e.target.value)}
              ></input>
            </div>
            <input
              type="submit"
              value="Crea"
              onClick={(e) => {
                insertData(e);
              }}
            ></input>
          </>
        )}
        {type === "edit" && (
          <>
            <div>
              <input
                defaultValue={nameToEdit}
                onChange={(e) => setDataName(e.target.value)}
              ></input>
            </div>
            <div>
              <input
                defaultValue={imageToEdit}
                onChange={(e) => setDataImage(e.target.value)}
              ></input>
            </div>
            <input
              type="submit"
              value="Salva"
              onClick={(e) => {
                updateData(e);
              }}
            ></input>
          </>
        )}
      </form>
    </div>
  );
}
