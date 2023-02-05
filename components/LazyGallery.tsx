import { useEffect, useState } from "react";
import { NFTDrop } from "@thirdweb-dev/sdk/solana";
import { useNFTs, useTotalSupply } from "@thirdweb-dev/react/solana";
import styles from "styles/Home.module.css";

const COUNT_PER_LOAD = 4;

const LazyGallery: React.FC<{ program: NFTDrop }> = ({ program }) => {
  const [count, setCount] = useState(COUNT_PER_LOAD);
  const [allShown, setAllShown] = useState(false);

  const { data: metadata } = useNFTs(program, {
    start: 0,
    count,
  });

  const { data: totalSupply } = useTotalSupply(program);

  useEffect(() => {
    if (totalSupply && count > totalSupply) {
      setAllShown(true);
    }
  }, [totalSupply]);

  useEffect(() => {
    if (totalSupply && count > totalSupply) {
      setAllShown(true);
    }
  }, [count]);

  const more = () => {
    setCount((prev) => prev + COUNT_PER_LOAD);
  };

  return (
    <div className={styles.lazyGallery}>
      {/* GALLERY */}
      <div className={styles.gallery}>
        {metadata?.map((e, idx) => (
          <div className={styles.card} key={idx}>
            <img
              src={e.metadata.image as string}
              alt={e.metadata.name as string}
            />
            <h3>{e.metadata.name}</h3>
            <p className={styles.dimText}>{`${e.owner.substring(
              0,
              4
            )}...${e.owner.substring(e.owner.length - 4, e.owner.length)}`}</p>
          </div>
        ))}
      </div>
      {/* LOAD TRIGGER */}
      {!allShown && (
        <button className={styles.loadMoreBtn} onClick={more}>
          Load more...
        </button>
      )}
    </div>
  );
};

export default LazyGallery;
