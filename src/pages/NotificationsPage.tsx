import Navbar from "@/components/Navbar";
import { mockNotifications, mockEvents } from "@/data/mockData";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Check, Mail, MessageCircle, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

const channelIcons = { email: Mail, whatsapp: MessageCircle, website: Globe };

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    toast.success("Marked as read");
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-10 max-w-3xl">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Notifications</h1>
              <p className="text-muted-foreground text-sm mt-1">
                {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
              </p>
            </div>
            {unreadCount > 0 && (
              <Button variant="outline" size="sm" onClick={markAllRead} className="gap-1">
                <Check className="w-4 h-4" /> Mark all read
              </Button>
            )}
          </div>

          <div className="space-y-3">
            {notifications.map((notif, i) => {
              const event = mockEvents.find((e) => e.id === notif.eventId);
              const ChannelIcon = channelIcons[notif.channel];
              return (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className={`p-4 bg-card transition-colors ${!notif.read ? 'border-primary/20' : 'opacity-70'}`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${
                        notif.type === 'urgent' ? 'bg-destructive animate-pulse-glow' :
                        notif.type === 'warning' ? 'bg-accent' :
                        notif.type === 'success' ? 'bg-success' : 'bg-primary'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="font-medium text-sm">{notif.title}</p>
                          {!notif.read && (
                            <Badge className="bg-primary/10 text-primary text-[10px] border-0">New</Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{notif.message}</p>
                        <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground">
                          {event && <span className="text-primary">{event.title}</span>}
                          <div className="flex items-center gap-1">
                            <ChannelIcon className="w-3 h-3" />
                            <span className="capitalize">{notif.channel}</span>
                          </div>
                          <span>{notif.sentAt}</span>
                        </div>
                      </div>
                      {!notif.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notif.id)}
                          className="text-xs flex-shrink-0"
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotificationsPage;
