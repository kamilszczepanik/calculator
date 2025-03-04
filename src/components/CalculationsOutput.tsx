interface Props {
  calculations: string;
  previousCalculations: string;
}

export const CalculationsOutput = ({
  calculations,
  previousCalculations,
}: Props) => {
  return (
    <div className="relative overflow-hidden max-w-36">
      <div className="relative">
        <div className="flex justify-end">
          <p className="text-gray-400 h-4 whitespace-nowrap ml-auto my-2.5 text-lg">
            {previousCalculations}
          </p>
        </div>
        <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-gray-700 to-transparent pointer-events-none"></div>
      </div>

      <div className="relative">
        <div className="flex justify-end">
          <p className="text-white text-2xl whitespace-nowrap ml-auto">
            {calculations}
          </p>
        </div>
        <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-gray-700 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
};
