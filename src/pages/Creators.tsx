import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  UserPlus,
  Instagram,
  Youtube,
  Music2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const platformIcons: Record<string, React.ElementType> = {
  Instagram: Instagram,
  YouTube: Youtube,
  TikTok: Music2,
};

const Creators = () => {
  const [creators, setCreators] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [filteredCreators, setFilteredCreators] = useState<any[]>([]);

  // // Filter creators (DERIVED DATA)
  useEffect(() => {
    let searchResults = creators.filter((creator) => {
      const matchesSearch =
        creator.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        creator.username?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesPlatform =
        platformFilter === "all" || creator.platform === platformFilter;

      const matchesCategory =
        categoryFilter === "all" || creator.category === categoryFilter;

      return matchesSearch && matchesPlatform && matchesCategory;
    });
    setFilteredCreators(searchResults);
  }, [searchTerm])

    // Load creators from localStorage
  useEffect(() => {
    const storedCreators = JSON.parse(
      localStorage.getItem("Creators_List") || "[]"
    );
    console.log(storedCreators);
    setCreators(storedCreators);
    setFilteredCreators(storedCreators);
  }, []);


  // // Dropdown values
  const platforms = [
    ...new Set(creators.map((c) => c.platform).filter(Boolean)),
  ];
  const categories = [
    ...new Set(creators.map((c) => c.category).filter(Boolean)),
  ];

  return (
    <>
      <Header
        title="Creator Discovery"
        subtitle="Find and connect with creators"
      />

      <div className="flex-1 overflow-auto p-6">
        {/* Filters Bar */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search creators..."
                className="w-64 pl-9 bg-card border-border"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* <Select value={platformFilter} onValueChange={setPlatformFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                {platforms.map((platform) => (
                  <SelectItem key={platform} value={platform}>
                    {platform}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select> */}
          </div>

          {/* <Button className="gap-2">
            <UserPlus className="w-4 h-4" />
            Add Creator
          </Button> */}
        </div>

        {/* Results Count */}
        <p className="text-sm text-muted-foreground mb-4">
          Showing {filteredCreators.length} of {creators.length} creators
        </p>

        {/* Creators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredCreators.map((creator, index) => {
            const PlatformIcon =
              platformIcons[creator?.platform] || Filter;

            return (
              <div
                key={creator?.id || index}
                className="bg-card rounded-xl p-6 border border-border shadow-soft hover:shadow-glow transition-all duration-300 animate-fade-in group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start gap-4">
                  <Avatar className="w-14 h-14 border-2 border-primary/20">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                      {creator?.username?.charAt(0)?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">
                      {creator?.fullName || creator.username}
                    </h3>

                    <p className="text-sm">
                      <a
                        href={creator?.profileUrl}
                        target="_blank"
                        className="text-primary hover:underline"
                      >
                        @{creator?.username}
                      </a>
                    </p>
                  </div>

                  <Badge variant="secondary" className="capitalize">
                    {creator?.status || "active"}
                  </Badge>
                </div>

                {/* Platform + Category */}
                <div className="mt-4 flex items-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/50">
                    <PlatformIcon className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">
                      {creator?.platform || "Instagram"}
                    </span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {creator?.category || "General"}
                  </Badge>
                </div>

                {/* Stats */}
                <div className="mt-5 pt-5 border-t border-border grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase">
                      Followers
                    </p>
                    <p className="text-xl font-bold mt-1">
                      {creator?.followers?.toLocaleString() || 0}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground uppercase">
                      Engagement
                    </p>
                    <p className="text-xl font-bold text-primary mt-1">
                      {creator?.engagement || "—"}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-5 flex gap-2">
                  <Button variant="outline" className="flex-1" size="sm">
                    View Profile
                  </Button>
                  <Button className="flex-1" size="sm">
                    Invite
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredCreators.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No creators found matching your filters.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Creators;
