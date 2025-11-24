// item/components/ItemHeader.tsx

export const ItemHeader = ({ bayCode }: { bayCode: string }) => {
  return (
    <h1 className="text-xl font-semibold text-center">Add Item to {bayCode}</h1>
  );
};
