
import { useEffect, useState, type FormEvent } from "react";
import type { Game, GameFormData, Genre, Platform } from "../../types";
import Button from "../ui/Button";
import Input from "../ui/Input";

interface GameFormProps {
  initialData?: Game | null;
  onSubmit: (data: GameFormData) => Promise<void>;
  onCancel: () => void;
}

const genres: Genre[] = [
  "Action",
  "Adventure",
  "RPG",
  "Sports",
  "Racing",
  "Shooter",
  "Simulation",
  "Strategy",
  "Puzzle",
  "Fighting",
];

const platforms: Platform[] = ["PC", "PlayStation", "Xbox", "Switch"];

const emptyForm: GameFormData = {
  title: "",
  genre: "Action",
  platform: "PC",
  releaseDate: "",
  rating: 0,
  cover: "",
  developer: "",
  description: "",
};

export default function GameForm({
  initialData,
  onSubmit,
  onCancel,
}: GameFormProps) {
  const [form, setForm] = useState<GameFormData>(emptyForm);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      const { title, genre, platform, releaseDate, rating, cover, developer, description } =
        initialData;

      setForm({
        title,
        genre,
        platform,
        releaseDate,
        rating,
        cover,
        developer,
        description,
      });
    } else {
      setForm(emptyForm);
    }
    setError("");
  }, [initialData]);

  const updateField = <K extends keyof GameFormData>(
    field: K,
    value: GameFormData[K],
  ) => {
    setForm((previous) => ({ ...previous, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (
      !form.title.trim() ||
      !form.developer.trim() ||
      !form.releaseDate ||
      !form.cover.trim() ||
      !form.description.trim()
    ) {
      setError("Please complete all fields.");
      return;
    }

    if (form.rating < 0 || form.rating > 10) {
      setError("Rating must be between 0 and 10.");
      return;
    }

    try {
      setSubmitting(true);
      await onSubmit({
        ...form,
        title: form.title.trim(),
        developer: form.developer.trim(),
        cover: form.cover.trim(),
        description: form.description.trim(),
      });
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to save game. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Game title"
          placeholder="e.g. Elden Ring"
          value={form.title}
          onChange={(event) => updateField("title", event.target.value)}
        />

        <Input
          label="Developer"
          placeholder="e.g. FromSoftware"
          value={form.developer}
          onChange={(event) => updateField("developer", event.target.value)}
        />

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Genre</label>
          <select
            value={form.genre}
            onChange={(event) =>
              updateField("genre", event.target.value as Genre)
            }
            className="w-full rounded-xl border border-white/10 bg-[#15151f] px-4 py-3 text-sm text-white outline-none focus:border-violet-500"
          >
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Platform</label>
          <select
            value={form.platform}
            onChange={(event) =>
              updateField("platform", event.target.value as Platform)
            }
            className="w-full rounded-xl border border-white/10 bg-[#15151f] px-4 py-3 text-sm text-white outline-none focus:border-violet-500"
          >
            {platforms.map((platform) => (
              <option key={platform} value={platform}>
                {platform}
              </option>
            ))}
          </select>
        </div>

        <Input
          label="Release date"
          type="date"
          value={form.releaseDate}
          onChange={(event) => updateField("releaseDate", event.target.value)}
        />

        <Input
          label="Rating (0–10)"
          type="number"
          min="0"
          max="10"
          step="0.1"
          value={form.rating}
          onChange={(event) =>
            updateField("rating", Number(event.target.value))
          }
        />
      </div>

      <Input
        label="Cover image URL"
        type="url"
        placeholder="https://example.com/game-cover.jpg"
        value={form.cover}
        onChange={(event) => updateField("cover", event.target.value)}
      />

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Description</label>
        <textarea
          rows={4}
          value={form.description}
          onChange={(event) => updateField("description", event.target.value)}
          placeholder="Write a short description of the game..."
          className="w-full resize-none rounded-xl border border-white/10 bg-[#15151f] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-violet-500"
        />
      </div>

      {error && (
        <p className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
          {error}
        </p>
      )}

      <div className="flex justify-end gap-3 border-t border-white/10 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" isLoading={submitting}>
          {initialData ? "Save changes" : "Add game"}
        </Button>
      </div>
    </form>
  );
}
