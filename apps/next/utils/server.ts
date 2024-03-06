import { initializeStore } from "app/store";
import { GetServerSideProps, GetStaticProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  const zustandStore = initializeStore();
  return {
    props: {
      initialZustandState: JSON.parse(JSON.stringify(zustandStore.getState())),
    },
  };
};

export const getStaticProps: GetStaticProps = async () => {
  const zustandStore = initializeStore();
  return {
    props: {
      initialZustandState: JSON.parse(JSON.stringify(zustandStore.getState())),
    },
  };
};
