import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FC } from "react";
import AtendeeList from "./atendeeList/atendeeList";

interface EventDetailBodyProps {
  eventId: string;
}

const EventDetailBody: FC<EventDetailBodyProps> = ({ eventId }) => {
  return (
    <Tabs
      defaultValue="preview"
      className="container mx-auto w-full p-6"
      orientation="horizontal"
    >
      <TabsList className="flex w-full">
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="atendeeList">Atendee List</TabsTrigger>
        <TabsTrigger value="transaction">Transaction</TabsTrigger>
      </TabsList>
      <TabsContent value="preview">
        <div>HELLO</div>
      </TabsContent>
      <TabsContent value="atendeeList">
        <AtendeeList eventId={eventId} />
      </TabsContent>
      <TabsContent value="transaction">
        <div>Transaction</div>
      </TabsContent>
    </Tabs>
  );
};

export default EventDetailBody;
