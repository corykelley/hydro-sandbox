export default function CollectionSlider({collectionArray, handle}) {
  const collection = collectionArray.find(
    (collection) => collection.handle === handle,
  );

  console.log(collection.products.edges);

  return (
    <section>
      {collection.products.edges.map((product) => {
        return <h1>{product.node.title}</h1>;
      })}
    </section>
  );
}
