import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SettingsTopBar } from "./components/settings-top-bar";
import { ProfileTab } from "./components/profile-tab";
import { GeneralTab } from "./components/general-tab";
import { useIsDemo } from "@/lib/demo";

export default function SettingsPage() {
  const isDemo = useIsDemo();

  return (
    <div className="flex min-h-screen flex-col">
      <SettingsTopBar />
      <div className="mx-auto w-full max-w-3xl flex-1 space-y-6 p-6">
        <h1 className="text-3xl font-semibold text-balance">Settings</h1>
        <Tabs defaultValue="profile">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="general">General</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <ProfileTab isDemo={isDemo} />
          </TabsContent>
          <TabsContent value="general">
            <GeneralTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
