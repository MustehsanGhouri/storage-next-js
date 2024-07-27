import Link from "next/link";
import { Card, Button } from "flowbite-react";

const PackageCards = () => {
  return (
    <div className="flex justify-center space-x-4 mt-10">
      {/* Basic Cloud Package Card */}
      <Card className="max-w-sm">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900">
          Basic Cloud
        </h5>
        <p className="font-normal text-gray-700">
          £5 for 5 GB. Perfect for personal use and light storage needs.
        </p>
        <Link href="/dashboard">
          <Button>Access Basic Package</Button>
        </Link>
      </Card>

      {/* Standard Cloud Package Card */}
      <Card className="max-w-sm">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900">
          Standard Cloud
        </h5>
        <p className="font-normal text-gray-700">
          £10 for 12 GB. Ideal for moderate storage requirements.
        </p>
        <Button disabled>Access Standard Package</Button>
      </Card>

      {/* Premium Cloud Package Card */}
      <Card className="max-w-sm">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900">
          Premium Cloud
        </h5>
        <p className="font-normal text-gray-700">
          £15 for 20 GB. Best for extensive storage needs and heavy usage.
        </p>
        <Button disabled>Access Premium Package</Button>
      </Card>
    </div>
  );
};

export default PackageCards;
