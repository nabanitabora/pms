import { getMachines } from "@/db/queries";
import MachineForm from "./machine-form";

export default async function MachineTab() {
  const machines = await getMachines();
  // const queryClient = useQueryClient();
  // const { data: machines } = useQuery({
  //   queryKey: ["machines"],
  //   queryFn: () => getMachines(),
  // });

  // const machineName = useMutation({
  //   mutationFn: updateMachineName,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["machines"] });
  //   },
  // });

  // const machineStatus = useMutation({
  //   mutationFn: updateMachineStatus,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["machines"] });
  //   },
  // });

  // async function handleSubmit(e: FormEvent<HTMLFormElement>, id: number) {
  //   e.preventDefault();
  //   const formData = new FormData(e.target as HTMLFormElement);
  //   const name = formData.get("name") as string;

  //   const res = await machineName.mutateAsync({ id, name });
  //   if (!res.success) alert("something went wrong!");
  // }

  return (
    <>
      <p className="text-lg font-semibold mb-6">Machines</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {machines &&
          machines.map((machine) => (
            <div
              key={machine.id}
              className="flex flex-col sm:flex-row items-start  sm:items-center justify-between gap-4 shadow-[0px_18px_40px_0px_rgba(112,144,176,0.12)] p-8 rounded-2xl"
            >
              <MachineForm machine={machine} />
            </div>
          ))}
      </div>
    </>
  );
}