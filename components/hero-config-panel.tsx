"use client";

import { useState } from "react";
import { Plus, Trash2, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface HeroSlide {
  image: string;
  title: string;
  subtitle: string;
  rating: number;
  reviews: number;
  lines: string[];
}

export function HeroConfigPanel() {
  const [slides, setSlides] = useState<HeroSlide[]>([
    {
      image: "https://images.unsplash.com/photo-1560958089-b8a63dd53c12?w=800&h=800&fit=crop",
      title: "Encuentra tu próximo vehículo",
      subtitle: "sin complicaciones",
      rating: 4.8,
      reviews: 1250,
      lines: [
        "✓ Búsqueda inteligente y filtros avanzados",
        "✓ Comparativas de precios en tiempo real",
        "✓ Información completa de cada vehículo",
      ],
    },
  ]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<HeroSlide>(slides[0]);

  const handleAddSlide = () => {
    setSlides([...slides, formData]);
    setFormData({
      image: "",
      title: "",
      subtitle: "",
      rating: 4.5,
      reviews: 0,
      lines: ["", "", ""],
    });
  };

  const handleUpdateSlide = (index: number) => {
    const updated = [...slides];
    updated[index] = formData;
    setSlides(updated);
    setEditingIndex(null);
  };

  const handleDeleteSlide = (index: number) => {
    setSlides(slides.filter((_, i) => i !== index));
  };

  const handleEditSlide = (index: number) => {
    setEditingIndex(index);
    setFormData(slides[index]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Hero Section Configuration</h1>
        <p className="text-muted-foreground mt-2">Manage hero slides and content</p>
      </div>

      {/* Slides List */}
      <Card>
        <CardHeader>
          <CardTitle>Slides ({slides.length})</CardTitle>
          <CardDescription>Configure each slide's content and settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {slides.map((slide, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
              <div className="flex items-center gap-4 flex-1">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{slide.title}</h3>
                  <p className="text-sm text-muted-foreground truncate">{slide.subtitle}</p>
                  <div className="text-xs text-muted-foreground mt-1">
                    ⭐ {slide.rating} ({slide.reviews} reviews)
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEditSlide(index)}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDeleteSlide(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}

          <Button onClick={handleAddSlide} className="w-full" variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add New Slide
          </Button>
        </CardContent>
      </Card>

      {/* Edit Form */}
      <Card>
        <CardHeader>
          <CardTitle>
            {editingIndex !== null ? `Edit Slide ${editingIndex + 1}` : "Add New Slide"}
          </CardTitle>
          <CardDescription>Fill in all fields to create or update a slide</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Image URL */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Image URL</label>
            <Input
              placeholder="https://images.unsplash.com/..."
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            />
            {formData.image && (
              <img src={formData.image} alt="Preview" className="w-full h-48 object-cover rounded" />
            )}
          </div>

          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input
              placeholder="Main headline"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          {/* Subtitle */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Subtitle</label>
            <Input
              placeholder="Secondary text"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            />
          </div>

          {/* Rating */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Rating (0-5)</label>
              <Input
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Number of Reviews</label>
              <Input
                type="number"
                value={formData.reviews}
                onChange={(e) => setFormData({ ...formData, reviews: parseInt(e.target.value) })}
              />
            </div>
          </div>

          {/* Bullet Points */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Bullet Points (3 lines)</label>
            {formData.lines.map((line, idx) => (
              <Input
                key={idx}
                placeholder={`Line ${idx + 1}`}
                value={line}
                onChange={(e) => {
                  const updated = [...formData.lines];
                  updated[idx] = e.target.value;
                  setFormData({ ...formData, lines: updated });
                }}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            {editingIndex !== null ? (
              <>
                <Button onClick={() => handleUpdateSlide(editingIndex)}>
                  Update Slide
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditingIndex(null);
                    setFormData({
                      image: "",
                      title: "",
                      subtitle: "",
                      rating: 4.5,
                      reviews: 0,
                      lines: ["", "", ""],
                    });
                  }}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={handleAddSlide}>Create Slide</Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* JSON Export */}
      <Card>
        <CardHeader>
          <CardTitle>Export Configuration</CardTitle>
          <CardDescription>Copy and paste this JSON to update hero-section.tsx</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted p-4 rounded text-sm overflow-auto max-h-48">
            {JSON.stringify(slides, null, 2)}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
