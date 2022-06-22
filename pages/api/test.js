export default function handler(req, res) {
  res.status(200).json([
    {
      zone: "Урд чиглэл",
      monday: "evening",
      tuesday: "morning",
      wednesday: "morning",
      thursday: "evening",
      friday: "morning",
      saturday: "evening",
      sunday: "morning",
    },
    {
      zone: "Хойд чиглэл",
      monday: "evening",
      tuesday: "evening",
      wednesday: "morning",
      thursday: "evening",
      friday: "morning",
      saturday: "evening",
      sunday: "",
    },
    {
      zone: "Баруун чиглэл",
      monday: "morning",
      tuesday: "evening",
      wednesday: "morning",
      thursday: "evening",
      friday: "evening",
      saturday: "morning",
      sunday: "",
    },
    {
      zone: "Зүүн чиглэл",
      monday: "evening",
      tuesday: "morning",
      wednesday: "morning",
      thursday: "evening",
      friday: "evening",
      saturday: "",
      sunday: "morning",
    },
  ]);
}
