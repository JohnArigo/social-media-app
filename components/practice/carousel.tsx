export type dataType = {
  title: string;
  content: string;
  img: string;
};
const data = [
  {
    title: "Title 1",
    content: "Content 1",
    img: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    title: "Title 2",
    content: "Content 2",
    img: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
  {
    title: "Title 3",
    content: "Content 3",
    img: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  },
];

export type CarouselProps = {
  data: dataType[];
};

export const carousel = (data: CarouselProps) => {
  //displaying 2 images at a time
  //needs a button to enter / div is clickable
  //2 side buttons to scroll through images
  //iterate through array using while loop, display current iteration- and future iteration
  //future iteration will have opacity changed
  //current is full opacity

  return (
    <main>
      <section>{data.map()}</section>
    </main>
  );
};
carousel(data);
export default carousel;
