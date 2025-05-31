import axios from 'axios';

const API_KEY = process.env.STABLE_DIFFUSION_API_KEY;
const API_URL = 'https://api.stability.ai/v1/generation/stable-diffusion-v1-5/text-to-image';

if (!API_KEY) {
    throw new Error('STABLE_DIFFUSION_API_KEY is not set in environment variables');
}

export class ImageGenerationService {
    static async generateImage(prompt: string): Promise<string | null> {
        try {
            const response = await fetch("https://modelslab.com/api/v6/realtime/text2img", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    key: "CJhCcox4hSHBmJ0G9g9zG88QGhwjiRJ5PwBBwsn9kzFG8rxVhjX4tzM74e5c", // Replace with your actual API key
                    prompt,
                    negative_prompt:
                        "(worst quality:2), (low quality:2), (normal quality:2), (jpeg artifacts), (blurry), (duplicate), (morbid), (mutilated), (out of frame), (extra limbs), (bad anatomy), (disfigured), (deformed), (cross-eye), (glitch), (oversaturated), (overexposed), (underexposed), (bad proportions), (bad hands), (bad feet), (cloned face), (long neck), (missing arms), (missing legs), (extra fingers), (fused fingers), (poorly drawn hands), (poorly drawn face), (mutation), (deformed eyes), watermark, text, logo, signature, grainy, tiling, censored, nsfw, ugly, blurry eyes, noisy image, bad lighting, unnatural skin, asymmetry",
                    samples: "1",
                    height: "1024",
                    width: "1024",
                    safety_checker: false,
                    seed: null,
                    base64: true,
                    webhook: null,
                    track_id: null,
                }),
            });

            const data = await response.json();

            if (data && data.output && Array.isArray(data.output)) {
                return data.output[0]; // Return the first image URL
            }

            return null;
        } catch (error) {
            console.error("Image generation failed:", error);
            return null;
        }
    }
}
