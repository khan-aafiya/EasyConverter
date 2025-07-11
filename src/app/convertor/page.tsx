
"use client";

import { useState, useRef, DragEvent, ChangeEvent, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { UploadCloud, FileDown, GripVertical, X, Loader2, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast"

type ImageFile = {
  id: string;
  file: File;
  preview: string;
};

export default function ConvertorPage() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [pdfName, setPdfName] = useState('easy-convertor.pdf');
  const [isConverting, setIsConverting] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const dragImage = useRef<number | null>(null);
  const dragOverImage = useRef<number | null>(null);
  const { toast } = useToast();

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      images.forEach(image => URL.revokeObjectURL(image.preview));
    };
  }, [images]);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newImages: ImageFile[] = Array.from(files)
      .filter(file => file.type.startsWith('image/'))
      .map(file => ({
        id: crypto.randomUUID(),
        file,
        preview: URL.createObjectURL(file),
      }));

    if (newImages.length === 0 && files.length > 0) {
      toast({
        title: "Invalid file type",
        description: "Please upload only image files.",
        variant: "destructive",
      });
      return;
    }

    setImages(prev => [...prev, ...newImages]);
  };
  
  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files);
    if(e.target) {
      e.target.value = '';
    }
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(false);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const onRemoveImage = (id: string) => {
    const imageToRemove = images.find(img => img.id === id);
    if (imageToRemove) {
      URL.revokeObjectURL(imageToRemove.preview);
    }
    setImages(images.filter(image => image.id !== id));
  };
  
  const onDragStart = (e: DragEvent<HTMLDivElement>, index: number) => {
    dragImage.current = index;
    e.dataTransfer.effectAllowed = 'move';
  };

  const onDragEnter = (e: DragEvent<HTMLDivElement>, index: number) => {
    dragOverImage.current = index;
    const newImages = [...images];
    if (dragImage.current === null || dragOverImage.current === null) return;
    if (dragImage.current === dragOverImage.current) return;

    const draggedItem = newImages.splice(dragImage.current, 1)[0];
    newImages.splice(dragOverImage.current, 0, draggedItem);
    
    dragImage.current = dragOverImage.current;
    setImages(newImages);
  };

  const onDragEnd = () => {
    dragImage.current = null;
    dragOverImage.current = null;
  };
  
  const createPdf = async () => {
    if (images.length === 0) {
      toast({
        title: "No images selected",
        description: "Please upload some images first.",
        variant: "destructive",
      });
      return;
    }
    setIsConverting(true);

    try {
      const { default: jsPDF } = await import('jspdf');
      
      const readImage = (imageFile: ImageFile): Promise<{data: string, width: number, height: number, type: string}> => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const img = new window.Image();
            img.onload = () => {
              const fileType = imageFile.file.type.split('/')[1]?.toUpperCase() || 'JPEG';
              resolve({ data: img.src, width: img.width, height: img.height, type: fileType });
            };
            img.onerror = reject;
            img.src = e.target?.result as string;
          };
          reader.onerror = reject;
          reader.readAsDataURL(imageFile.file);
        });
      };

      const firstImage = await readImage(images[0]);
      
      const doc = new jsPDF({
        orientation: firstImage.width > firstImage.height ? 'l' : 'p',
        unit: 'px',
        format: [firstImage.width, firstImage.height]
      });
      doc.addImage(firstImage.data, firstImage.type, 0, 0, firstImage.width, firstImage.height);

      for (let i = 1; i < images.length; i++) {
        const { data, width, height, type } = await readImage(images[i]);
        const orientation = width > height ? 'l' : 'p';
        doc.addPage([width, height], orientation);
        doc.addImage(data, type, 0, 0, width, height);
      }
      
      const finalPdfName = pdfName.trim() ? (pdfName.endsWith('.pdf') ? pdfName : `${pdfName}.pdf`) : 'easy-convertor.pdf';
      doc.save(finalPdfName);
    } catch (error) {
      console.error("Failed to create PDF:", error);
      toast({
        title: "PDF Creation Failed",
        description: "An error occurred. Check console for details.",
        variant: "destructive",
      });
    } finally {
      setIsConverting(false);
    }
  };

  return (
      <main className="min-h-screen p-4 sm:p-8">
        <div className="max-w-5xl mx-auto space-y-8">
          <header className="text-center relative">
             <Button variant="outline" size="icon" className="absolute top-0 left-0" asChild>
              <Link href="/" aria-label="Back to Home">
                <Home className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="font-headline text-4xl sm:text-5xl font-bold text-foreground">Easy Convertor</h1>
            <p className="text-muted-foreground mt-2 text-lg">Convert your images to PDF in three simple steps.</p>
          </header>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UploadCloud className="text-primary"/>
                Step 1: Upload Images
              </CardTitle>
              <CardDescription>Drag & drop your images or click to select files. You can reorder them later.</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  "border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors",
                  "hover:border-primary hover:bg-primary/5",
                  isDraggingOver ? "border-primary bg-primary/10" : "border-border"
                )}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={onFileChange}
                  className="hidden"
                />
                <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-4 text-muted-foreground">Drop files here or click to browse</p>
              </div>
            </CardContent>
          </Card>

          {images.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GripVertical className="text-primary"/>
                  Step 2: Reorder Images
                </CardTitle>
                <CardDescription>Drag and drop the images to set their order in the final PDF.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {images.map((image, index) => (
                    <div
                      key={image.id}
                      draggable
                      onDragStart={(e) => onDragStart(e, index)}
                      onDragEnter={(e) => onDragEnter(e, index)}
                      onDragEnd={onDragEnd}
                      className="relative group aspect-square border rounded-lg overflow-hidden shadow-sm cursor-grab active:cursor-grabbing transition-transform will-change-transform"
                    >
                      <Image src={image.preview} alt={`preview ${index + 1}`} fill style={{ objectFit: 'cover' }} sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw" />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                         <GripVertical className="text-white w-8 h-8" />
                      </div>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        onClick={() => onRemoveImage(image.id)}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove image</span>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {images.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileDown className="text-primary"/>
                  Step 3: Create and Download
                </CardTitle>
                <CardDescription>Name your PDF file and click the button to generate and download it.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    placeholder="Enter PDF name"
                    value={pdfName}
                    onChange={(e) => setPdfName(e.target.value)}
                    className="flex-grow"
                  />
                  <Button
                    onClick={createPdf}
                    disabled={isConverting || images.length === 0}
                    className="w-full sm:w-auto"
                    size="lg"
                  >
                    {isConverting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Converting...
                      </>
                    ) : (
                      <>
                        <FileDown className="mr-2 h-4 w-4" />
                        Create & Download PDF
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
  );
}
