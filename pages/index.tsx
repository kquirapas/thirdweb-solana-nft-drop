import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import styles from "styles/Home.module.css";
import {
  useProgram,
  useProgramMetadata,
  useClaimNFT,
  useDropTotalClaimedSupply,
  useTotalSupply,
} from "@thirdweb-dev/react/solana";

import { LazyGallery } from "modules/common";
import { useEffect } from "react";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

// Put Your NFT Drop Program address from the dashboard here
const nftDropProgramAddress = "75bx5M9ujGUvX3BD7hrm2RwYCL7X6Yx31VxzsnC7BeHv";

const Home: NextPage = () => {
  // Here's how to get the thirdweb SDK instance
  // const sdk = useSDK();
  // Here's how to get a nft collection
  // const { program } = useProgram(
  //   your_nft_collection_address,
  //   "nft-collection"
  // );
  const { program } = useProgram(nftDropProgramAddress, "nft-drop");

  const { data: collectionMetadata } = useProgramMetadata(program);

  const { mutateAsync: claim, isLoading, error } = useClaimNFT(program);

  // supply hooks
  const { data: claimedSupply } = useDropTotalClaimedSupply(program);
  const { data: totalSupply } = useTotalSupply(program);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h1 className={styles.h1}>{collectionMetadata?.name}</h1>
          <div className={styles.thumbnailWrapper}>
            <Image
              fill
              className={styles.thumbnail}
              src={collectionMetadata?.image as string}
              style={{
                objectFit: "contain",
              }}
              alt="thirdweb Solana NFT Drop Collection"
            />
          </div>
          <p className={styles.description}>
            {collectionMetadata?.description}
          </p>

          {/* COLLECTION CLAIMING/MINTING DETAILS */}
          {claimedSupply && totalSupply && (
            <div className={styles.details}>
              <span>Total Minted</span>

              <span>
                {claimedSupply}/{totalSupply}
              </span>
            </div>
          )}

          <WalletMultiButtonDynamic />

          <button
            className={styles.mintBtn}
            onClick={() => claim({ amount: 1 })}
          >
            Mint
          </button>

          <hr className={styles.ruler} />

          <LazyGallery program={program} />

          <footer className={styles.footer}>
            <p className={styles.dimText}>Powered by</p>
            <a
              href="https://thirdweb.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/logo.png"
                width={200}
                height={30}
                alt="thirweb Logo"
              />
            </a>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Home;
