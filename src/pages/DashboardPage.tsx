import { useState } from "react";
import Navbar from "@/components/Navbar";
import { mockEvents, mockParticipants, mockNotifications } from "@/data/mockData";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, CheckCircle, Bell, Plus, Send, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

const DashboardPage = () => {
  const [selectedEvent, setSelectedEvent] = useState(mockEvents[0].id);
  const [notifTitle, setNotifTitle] = useState("");
  const [notifMessage, setNotifMessage] = useState("");
  const [notifChannel, setNotifChannel] = useState("website");

  const eventParticipants = mockParticipants.filter((p) => p.eventId === selectedEvent);
  const eventNotifications = mockNotifications.filter((n) => n.eventId === selectedEvent);
  const event = mockEvents.find((e) => e.id === selectedEvent)!;

  const checkedInCount = eventParticipants.filter((p) => p.checkedIn).length;

  const handleCheckIn = (name: string) => {
    toast.success(`${name} checked in!`);
  };

  const handleSendNotification = () => {
    if (!notifTitle.trim() || !notifMessage.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success("Notification sent!", { description: `Sent via ${notifChannel} to ${event.title} participants` });
    setNotifTitle("");
    setNotifMessage("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground text-sm mt-1">Manage events, participants, and notifications</p>
            </div>
            <Select value={selectedEvent} onValueChange={setSelectedEvent}>
              <SelectTrigger className="w-[220px] bg-secondary">
                <Calendar className="w-4 h-4 mr-2 text-primary" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {mockEvents.map((e) => (
                  <SelectItem key={e.id} value={e.id}>{e.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Registered", value: eventParticipants.length, icon: Users, color: "text-primary" },
              { label: "Checked In", value: checkedInCount, icon: CheckCircle, color: "text-success" },
              { label: "Pending", value: eventParticipants.length - checkedInCount, icon: Users, color: "text-accent" },
              { label: "Notifications", value: eventNotifications.length, icon: Bell, color: "text-primary" },
            ].map((s) => (
              <Card key={s.label} className="p-4 bg-card">
                <div className="flex items-center gap-2 mb-1">
                  <s.icon className={`w-4 h-4 ${s.color}`} />
                  <span className="text-xs text-muted-foreground">{s.label}</span>
                </div>
                <div className="text-2xl font-bold">{s.value}</div>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="attendees" className="space-y-6">
            <TabsList className="bg-secondary">
              <TabsTrigger value="attendees">Attendees</TabsTrigger>
              <TabsTrigger value="checkin">Check-in</TabsTrigger>
              <TabsTrigger value="notifications">Send Notification</TabsTrigger>
              <TabsTrigger value="history">Notification History</TabsTrigger>
            </TabsList>

            {/* Attendees */}
            <TabsContent value="attendees">
              <Card className="p-5 bg-card">
                <h3 className="font-semibold mb-4">Registered Attendees — {event.title}</h3>
                {eventParticipants.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No registrations yet.</p>
                ) : (
                  <div className="divide-y divide-border">
                    {eventParticipants.map((p) => (
                      <div key={p.id} className="flex items-center justify-between py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-sm font-medium text-secondary-foreground">
                            {p.name[0]}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{p.name}</p>
                            <p className="text-xs text-muted-foreground">{p.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {p.teamId && <Badge variant="outline" className="text-[10px]">Team</Badge>}
                          <Badge variant={p.checkedIn ? "default" : "outline"} className={p.checkedIn ? "bg-success text-success-foreground" : ""}>
                            {p.checkedIn ? "Checked in" : "Pending"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </TabsContent>

            {/* Check-in */}
            <TabsContent value="checkin">
              <Card className="p-5 bg-card">
                <h3 className="font-semibold mb-4">Quick Check-in</h3>
                <div className="space-y-2">
                  {eventParticipants.map((p) => (
                    <div key={p.id} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-secondary/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-sm font-medium text-secondary-foreground">
                          {p.name[0]}
                        </div>
                        <span className="text-sm">{p.name}</span>
                      </div>
                      <Button
                        size="sm"
                        variant={p.checkedIn ? "secondary" : "default"}
                        onClick={() => handleCheckIn(p.name)}
                        className={p.checkedIn ? "" : "bg-primary text-primary-foreground"}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        {p.checkedIn ? "Done" : "Check in"}
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Send Notification */}
            <TabsContent value="notifications">
              <Card className="p-5 bg-card max-w-lg">
                <h3 className="font-semibold mb-4">Send Notification</h3>
                <div className="space-y-4">
                  <Input
                    placeholder="Notification title"
                    value={notifTitle}
                    onChange={(e) => setNotifTitle(e.target.value)}
                    className="bg-secondary"
                  />
                  <Textarea
                    placeholder="Write your message..."
                    value={notifMessage}
                    onChange={(e) => setNotifMessage(e.target.value)}
                    className="bg-secondary min-h-[100px]"
                  />
                  <div className="flex gap-2">
                    {["website", "email", "whatsapp"].map((ch) => (
                      <Button
                        key={ch}
                        variant={notifChannel === ch ? "default" : "outline"}
                        size="sm"
                        onClick={() => setNotifChannel(ch)}
                        className="capitalize text-xs"
                      >
                        {ch}
                      </Button>
                    ))}
                  </div>
                  <Button onClick={handleSendNotification} className="gap-2 bg-primary text-primary-foreground">
                    <Send className="w-4 h-4" /> Send Notification
                  </Button>
                </div>
              </Card>
            </TabsContent>

            {/* History */}
            <TabsContent value="history">
              <Card className="p-5 bg-card">
                <h3 className="font-semibold mb-4">Notification History</h3>
                {eventNotifications.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No notifications sent for this event.</p>
                ) : (
                  <div className="space-y-3">
                    {eventNotifications.map((n) => (
                      <div key={n.id} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          n.type === 'urgent' ? 'bg-destructive' :
                          n.type === 'warning' ? 'bg-accent' :
                          n.type === 'success' ? 'bg-success' : 'bg-primary'
                        }`} />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium">{n.title}</p>
                            <Badge variant="outline" className="text-[10px] capitalize">{n.channel}</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">{n.message}</p>
                          <p className="text-[10px] text-muted-foreground mt-1">{n.sentAt}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
