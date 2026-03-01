import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { mockEvents, mockParticipants, mockTeams } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Calendar, MapPin, Users, ArrowLeft, Wifi, Building, Globe, UserPlus, Copy } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

const typeIcons = { online: Wifi, offline: Building, hybrid: Globe };

const EventDetailPage = () => {
  const { id } = useParams();
  const event = mockEvents.find((e) => e.id === id);
  const participants = mockParticipants.filter((p) => p.eventId === id);
  const teams = mockTeams.filter((t) => t.eventId === id);
  const [registered, setRegistered] = useState(false);

  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center text-muted-foreground">
          Event not found.
          <Link to="/" className="block mt-4 text-primary">Go back</Link>
        </div>
      </div>
    );
  }

  const TypeIcon = typeIcons[event.type];

  const handleRegister = () => {
    setRegistered(true);
    toast.success("Successfully registered!", { description: `You are now registered for ${event.title}` });
  };

  const handleCopyInvite = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.info("Invite code copied!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <Link to="/events">
          <Button variant="ghost" size="sm" className="gap-1 mb-6 text-muted-foreground">
            <ArrowLeft className="w-4 h-4" /> Back to events
          </Button>
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="border-primary/30 text-primary">{event.category}</Badge>
                <div className="flex items-center gap-1 text-muted-foreground text-xs">
                  <TypeIcon className="w-3.5 h-3.5" />
                  <span className="capitalize">{event.type}</span>
                </div>
              </div>
              <h1 className="text-3xl font-bold">{event.title}</h1>
            </div>
            <Button
              size="lg"
              onClick={handleRegister}
              disabled={registered}
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <UserPlus className="w-4 h-4" />
              {registered ? "Registered ✓" : "Register Now"}
            </Button>
          </div>

          {/* Info */}
          <Card className="p-6 mb-6 bg-card">
            <p className="text-muted-foreground mb-6">{event.description}</p>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4 text-primary" />
                {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} · {event.time}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                {event.venue}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-4 h-4 text-primary" />
                {event.registeredCount} / {event.maxParticipants} registered
              </div>
            </div>
            <div className="flex gap-1.5 mt-4">
              {event.tags.map((t) => (
                <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{t}</span>
              ))}
            </div>
          </Card>

          {/* Teams */}
          {teams.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Teams</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {teams.map((team) => (
                  <Card key={team.id} className="p-4 bg-card">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">{team.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {team.members.length}/{team.maxMembers}
                      </Badge>
                    </div>
                    <div className="space-y-1 mb-3">
                      {team.members.map((m) => (
                        <div key={m.id} className="text-sm text-muted-foreground flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-[10px] font-medium text-secondary-foreground">
                            {m.name[0]}
                          </div>
                          {m.name}
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1 text-xs text-primary"
                      onClick={() => handleCopyInvite(team.inviteCode)}
                    >
                      <Copy className="w-3 h-3" />
                      Invite: {team.inviteCode}
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Participants */}
          {participants.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Registered Participants</h2>
              <Card className="p-4 bg-card">
                <div className="divide-y divide-border">
                  {participants.map((p) => (
                    <div key={p.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-sm font-medium text-secondary-foreground">
                          {p.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{p.name}</p>
                          <p className="text-xs text-muted-foreground">{p.email}</p>
                        </div>
                      </div>
                      <Badge variant={p.checkedIn ? "default" : "outline"} className={p.checkedIn ? "bg-success text-success-foreground" : ""}>
                        {p.checkedIn ? "Checked in" : "Pending"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default EventDetailPage;
