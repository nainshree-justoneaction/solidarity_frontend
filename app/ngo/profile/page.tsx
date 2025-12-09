"use client";
export default function ProfilePage() {
  const [profile, setProfile] = React.useState(JSON.parse(localStorage.getItem("ngoProfile") || '{"name":"GreenWave Trust","reg":"AA12345","location":"Indore"}'));
  function save() { localStorage.setItem("ngoProfile", JSON.stringify(profile)); alert("Saved locally"); }
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold mb-4">NGO Profile</h1>
      <div className="bg-[#0F0F0F] border border-[#202020] rounded-lg p-4 space-y-3">
        <div><label className="text-zinc-400 text-sm">Name</label><input value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} className="w-full mt-2 bg-black border border-zinc-800 rounded px-3 py-2 text-white" /></div>
        <div><label className="text-zinc-400 text-sm">Reg. No</label><input value={profile.reg} onChange={e => setProfile({ ...profile, reg: e.target.value })} className="w-full mt-2 bg-black border border-zinc-800 rounded px-3 py-2 text-white" /></div>
        <div><label className="text-zinc-400 text-sm">Location</label><input value={profile.location} onChange={e => setProfile({ ...profile, location: e.target.value })} className="w-full mt-2 bg-black border border-zinc-800 rounded px-3 py-2 text-white" /></div>
        <button onClick={save} className="bg-white text-black px-3 py-2 rounded-md">Save</button>
      </div>
    </div>
  );
}
