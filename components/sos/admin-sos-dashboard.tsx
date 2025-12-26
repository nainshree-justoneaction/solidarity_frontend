"use client"

import type React from "react"

import { useState } from "react"
import { Shield, Heart, CloudRain, HelpCircle, MapPin, Clock, User, Users, Filter, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type SOSStatus = "pending" | "acknowledged" | "resolved"
type EmergencyType = "safety" | "medical" | "disaster" | "other"

interface SOSAlert {
  id: string
  type: EmergencyType
  location: string
  time: string
  userType: "logged-in" | "guest"
  status: SOSStatus
  userName?: string
}

const mockAlerts: SOSAlert[] = [
  {
    id: "1",
    type: "medical",
    location: "Downtown SF, CA",
    time: "2 min ago",
    userType: "logged-in",
    status: "pending",
    userName: "Sarah M.",
  },
  {
    id: "2",
    type: "safety",
    location: "Oakland, CA",
    time: "5 min ago",
    userType: "guest",
    status: "acknowledged",
  },
  {
    id: "3",
    type: "disaster",
    location: "Berkeley, CA",
    time: "12 min ago",
    userType: "logged-in",
    status: "pending",
    userName: "John D.",
  },
  {
    id: "4",
    type: "other",
    location: "San Jose, CA",
    time: "25 min ago",
    userType: "guest",
    status: "resolved",
  },
  {
    id: "5",
    type: "medical",
    location: "Palo Alto, CA",
    time: "1 hour ago",
    userType: "logged-in",
    status: "resolved",
    userName: "Emily R.",
  },
]

const emergencyTypeConfig: Record<EmergencyType, { label: string; icon: React.ReactNode; color: string }> = {
  safety: {
    label: "Personal Safety",
    icon: <Shield className="h-4 w-4" />,
    color: "bg-chart-3 text-chart-3-foreground",
  },
  medical: { label: "Medical", icon: <Heart className="h-4 w-4" />, color: "bg-emergency text-emergency-foreground" },
  disaster: { label: "Disaster", icon: <CloudRain className="h-4 w-4" />, color: "bg-warning text-warning-foreground" },
  other: { label: "Other", icon: <HelpCircle className="h-4 w-4" />, color: "bg-muted text-muted-foreground" },
}

const statusConfig: Record<SOSStatus, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-emergency/20 text-emergency border-emergency/30 animate-pulse" },
  acknowledged: { label: "Acknowledged", className: "bg-warning/20 text-warning-foreground border-warning/30" },
  resolved: { label: "Resolved", className: "bg-success/20 text-success border-success/30" },
}

export function AdminSOSDashboard() {
  const [alerts, setAlerts] = useState<SOSAlert[]>(mockAlerts)
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")

  const filteredAlerts = alerts.filter((alert) => {
    if (statusFilter !== "all" && alert.status !== statusFilter) return false
    if (typeFilter !== "all" && alert.type !== typeFilter) return false
    return true
  })

  const pendingCount = alerts.filter((a) => a.status === "pending").length
  const acknowledgedCount = alerts.filter((a) => a.status === "acknowledged").length

  const updateStatus = (id: string, newStatus: SOSStatus) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === id ? { ...alert, status: newStatus } : alert)))
  }

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-emergency/10 border-emergency/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-emergency">{pendingCount}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-emergency/20 flex items-center justify-center">
                <Clock className="h-5 w-5 text-emergency" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-warning/10 border-warning/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold text-foreground">{acknowledgedCount}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-warning/20 flex items-center justify-center">
                <RefreshCw className="h-5 w-5 text-warning-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Today</p>
                <p className="text-2xl font-bold text-foreground">{alerts.length}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                <Shield className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-success/10 border-success/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Resolved</p>
                <p className="text-2xl font-bold text-success">
                  {alerts.filter((a) => a.status === "resolved").length}
                </p>
              </div>
              <div className="h-10 w-10 rounded-full bg-success/20 flex items-center justify-center">
                <svg className="h-5 w-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Live SOS Feed</h2>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px] bg-background">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="acknowledged">Acknowledged</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[160px] bg-background">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="safety">Personal Safety</SelectItem>
              <SelectItem value="medical">Medical</SelectItem>
              <SelectItem value="disaster">Disaster</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Alert Cards */}
      <div className="space-y-3">
        {filteredAlerts.map((alert) => (
          <Card
            key={alert.id}
            className={`transition-all ${alert.status === "pending" ? "border-emergency/50 shadow-emergency/10 shadow-lg" : ""}`}
          >
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      alert.type === "medical"
                        ? "bg-emergency/20 text-emergency"
                        : alert.type === "safety"
                          ? "bg-chart-3/20 text-chart-3"
                          : alert.type === "disaster"
                            ? "bg-warning/20 text-warning-foreground"
                            : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {emergencyTypeConfig[alert.type].icon}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-foreground">{emergencyTypeConfig[alert.type].label}</span>
                      <Badge variant="outline" className={statusConfig[alert.status].className}>
                        {statusConfig[alert.status].label}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {alert.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {alert.time}
                      </span>
                      <span className="flex items-center gap-1">
                        {alert.userType === "logged-in" ? <User className="h-3 w-3" /> : <Users className="h-3 w-3" />}
                        {alert.userType === "logged-in" ? alert.userName : "Guest"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 ml-14 md:ml-0">
                  {alert.status === "pending" && (
                    <Button size="sm" variant="outline" onClick={() => updateStatus(alert.id, "acknowledged")}>
                      Acknowledge
                    </Button>
                  )}
                  {alert.status === "acknowledged" && (
                    <Button
                      size="sm"
                      className="bg-success hover:bg-success/90 text-success-foreground"
                      onClick={() => updateStatus(alert.id, "resolved")}
                    >
                      Mark Resolved
                    </Button>
                  )}
                  {alert.status === "resolved" && (
                    <Button size="sm" variant="ghost" disabled>
                      Resolved
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredAlerts.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No alerts matching your filters</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
