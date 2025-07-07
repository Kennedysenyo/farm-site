"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Send,
  Users,
  Mail,
  TrendingUp,
  Loader,
} from "lucide-react";
import { NewslettersType, NewsletterSubscribersType } from "@/db/schema";

export default function AdminNewsletterPage() {
  const [newsletters, setNewsletters] = useState<NewslettersType[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscribersType[]>(
    [],
  );
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [fetchSubsError, setSubsFetchError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [newNewsletter, setNewNewsletter] = useState({
    subject: "",
    content: "",
  });

  useEffect(() => {
    const fetchNewsletters = async () => {
      try {
        const respose = await fetch("/api/newsletters", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await respose.json();
        if (!data) throw new Error("Failed Fetching Data, Try Again!");
        setNewsletters(data);
      } catch (error) {
        if (error instanceof Error) {
          setFetchError(error.message);
        } else {
          setFetchError(error as string);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNewsletters();
  }, []);

  useEffect(() => {
    const fetchNewslettersSubscribers = async () => {
      try {
        const respose = await fetch("/api/newsletters", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await respose.json();
        if (!data) throw new Error("Failed Fetching Data, Try Again!");
        setSubscribers(data);
      } catch (error) {
        if (error instanceof Error) {
          setFetchError(error.message);
        } else {
          setSubsFetchError(error as string);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNewslettersSubscribers();
  }, []);

  const filteredNewsletters = newsletters.filter((newsletter) => {
    const matchesSearch = newsletter.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || newsletter.title === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "sent":
        return <Badge variant="default">Sent</Badge>;
      case "scheduled":
        return (
          <Badge variant="outline" className="border-blue-600 text-blue-600">
            Scheduled
          </Badge>
        );
      case "draft":
        return <Badge variant="secondary">Draft</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleSendNewsletter = () => {
    // Handle newsletter sending logic
    console.log("Sending newsletter:", newNewsletter);
    setNewNewsletter({ subject: "", content: "" });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Newsletter</h1>
          <p className="text-muted-foreground">
            Create and manage your email newsletters
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Subscribers
            </CardTitle>
            <Users className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,250</div>
            <p className="text-muted-foreground text-xs">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Newsletters Sent
            </CardTitle>
            <Mail className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {newsletters.filter((n) => n.status === "sent").length}
            </div>
            <p className="text-muted-foreground text-xs">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Open Rate
            </CardTitle>
            <TrendingUp className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-muted-foreground text-xs">
              Above industry average
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Click Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12%</div>
            <p className="text-muted-foreground text-xs">+2% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="compose" className="space-y-6">
        <TabsList>
          <TabsTrigger value="compose">Compose Newsletter</TabsTrigger>
          <TabsTrigger value="history">Newsletter History</TabsTrigger>
          <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
        </TabsList>

        {/* Compose Newsletter Tab */}
        <TabsContent value="compose">
          <Card>
            <CardHeader>
              <CardTitle>Create New Newsletter</CardTitle>
              <CardDescription>
                Compose and send newsletters to your subscribers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject Line</label>
                <Input
                  placeholder="Enter newsletter subject..."
                  value={newNewsletter.subject}
                  onChange={(e) =>
                    setNewNewsletter({
                      ...newNewsletter,
                      subject: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Content</label>
                <Textarea
                  placeholder="Write your newsletter content here..."
                  rows={12}
                  value={newNewsletter.content}
                  onChange={(e) =>
                    setNewNewsletter({
                      ...newNewsletter,
                      content: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="text-muted-foreground text-sm">
                  Will be sent to 1,250 active subscribers
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline">Save as Draft</Button>
                  <Button variant="outline">Schedule</Button>
                  <Button onClick={handleSendNewsletter}>
                    <Send className="mr-2 h-4 w-4" />
                    Send Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Newsletter History Tab */}
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Newsletter History</CardTitle>
              <CardDescription>
                View all sent and scheduled newsletters
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-1 items-center space-x-2">
                  <div className="relative max-w-sm flex-1">
                    <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                    <Input
                      placeholder="Search newsletters..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="sent">Sent</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {loading ? (
                <div className="flex h-64 flex-col items-center justify-center space-y-4">
                  <Loader className="text-primary h-12 w-12 animate-spin" />
                  <p className="text-muted-foreground">
                    Loading newsletters...
                  </p>
                </div>
              ) : fetchError ? (
                <h2 className="text-destructive text-center text-2xl">
                  {fetchError}
                </h2>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Sent Date</TableHead>
                      <TableHead>Recipients</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredNewsletters.map((newsletter) => (
                      <TableRow key={newsletter.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {newsletter.title}
                            </div>
                            <div className="text-muted-foreground line-clamp-1 text-sm">
                              {newsletter.content}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(newsletter.status)}
                        </TableCell>
                        <TableCell>
                          {newsletter.sentDate ? (
                            new Date(newsletter.sentDate).toLocaleDateString()
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>

                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Subscribers Tab */}
        <TabsContent value="subscribers">
          <Card>
            <CardHeader>
              <CardTitle>Newsletter Subscribers</CardTitle>
              <CardDescription>
                Manage your newsletter subscriber list
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-1 items-center space-x-2">
                  <div className="relative max-w-sm flex-1">
                    <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                    <Input
                      placeholder="Search subscribers..."
                      className="pl-9"
                    />
                  </div>
                </div>
              </div>

              {loading ? (
                <div className="flex h-64 flex-col items-center justify-center space-y-4">
                  <Loader className="text-primary h-12 w-12 animate-spin" />
                  <p className="text-muted-foreground">
                    Loading subscribers...
                  </p>
                </div>
              ) : fetchSubsError ? (
                <h2 className="text-destructive text-center text-2xl">
                  {fetchSubsError}
                </h2>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subscriber</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Subscribed Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subscribers.map((subscriber) => (
                      <TableRow key={subscriber.id}>
                        <TableCell>{subscriber.email}</TableCell>

                        <TableCell>
                          {new Date(subscriber.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Remove
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
