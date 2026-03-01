import { useState } from "react";
import Navbar from "@/components/Navbar";
import { mockTeams, mockEvents } from "@/data/mockData";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Plus, Copy, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const TeamsPage = () => {
  const [teamName, setTeamName] = useState("");
  const [eventId, setEventId] = useState(mockEvents[0].id);
  const [joinCode, setJoinCode] = useState("");

  const handleCreateTeam = () => {
    if (!teamName.trim()) {
      toast.error("Please enter a team name");
      return;
    }
    toast.success("Team created!", { description: `${teamName} has been created` });
    setTeamName("");
  };

  const handleJoinTeam = () => {
    if (!joinCode.trim()) {
      toast.error("Please enter an invite code");
      return;
    }
    const team = mockTeams.find((t) => t.inviteCode === joinCode);
    if (team) {
      toast.success(`Joined ${team.name}!`);
    } else {
      toast.error("Invalid invite code");
    }
    setJoinCode("");
  };

  const handleCopyInvite = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.info("Invite code copied!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold">Teams</h1>
              <p className="text-muted-foreground text-sm mt-1">Create, join, and manage event teams</p>
            </div>
            <div className="flex gap-2">
              {/* Create Team */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gap-2 bg-primary text-primary-foreground">
                    <Plus className="w-4 h-4" /> Create Team
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-card border-border">
                  <DialogHeader>
                    <DialogTitle>Create a New Team</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <Input
                      placeholder="Team name"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      className="bg-secondary"
                    />
                    <Select value={eventId} onValueChange={setEventId}>
                      <SelectTrigger className="bg-secondary">
                        <SelectValue placeholder="Select event" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockEvents.map((e) => (
                          <SelectItem key={e.id} value={e.id}>{e.title}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button onClick={handleCreateTeam} className="w-full bg-primary text-primary-foreground">
                      Create Team
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Join Team */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <UserPlus className="w-4 h-4" /> Join Team
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-card border-border">
                  <DialogHeader>
                    <DialogTitle>Join a Team</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <Input
                      placeholder="Enter invite code (e.g., CC-2026)"
                      value={joinCode}
                      onChange={(e) => setJoinCode(e.target.value)}
                      className="bg-secondary"
                    />
                    <Button onClick={handleJoinTeam} className="w-full bg-primary text-primary-foreground">
                      Join Team
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Team Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {mockTeams.map((team, i) => {
              const event = mockEvents.find((e) => e.id === team.eventId);
              return (
                <motion.div
                  key={team.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="p-5 bg-card hover:border-primary/30 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-lg">{team.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        <Users className="w-3 h-3 mr-1" />
                        {team.members.length}/{team.maxMembers}
                      </Badge>
                    </div>
                    {event && (
                      <p className="text-xs text-primary mb-3">{event.title}</p>
                    )}
                    <div className="space-y-2 mb-4">
                      {team.members.map((m) => (
                        <div key={m.id} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-[10px] font-medium text-secondary-foreground">
                            {m.name[0]}
                          </div>
                          {m.name}
                        </div>
                      ))}
                      {team.members.length < team.maxMembers && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground/50">
                          <div className="w-6 h-6 rounded-full border border-dashed border-border flex items-center justify-center">
                            <Plus className="w-3 h-3" />
                          </div>
                          {team.maxMembers - team.members.length} spot{team.maxMembers - team.members.length > 1 ? 's' : ''} left
                        </div>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1 text-xs text-primary w-full justify-center border border-border/50"
                      onClick={() => handleCopyInvite(team.inviteCode)}
                    >
                      <Copy className="w-3 h-3" />
                      Copy Invite: {team.inviteCode}
                    </Button>
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

export default TeamsPage;
