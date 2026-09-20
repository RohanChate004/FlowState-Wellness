from django.core.management.base import BaseCommand
from yoga.models import Asana, Pranayama


# ============================================================
# ASANA DATA
# ============================================================

ASANAS = [
    {
        "name": "Tadasana",
        "sanskrit_name": "Tadasana",
        "short_description": "A foundational standing posture that encourages steady alignment and body awareness.",
        "category": "Standing",
        "difficulty": "Beginner",
        "benefits": "Supports posture, balance, grounding, and body awareness.",
        "instructions": "Stand tall with the feet grounded. Lengthen the spine, relax the shoulders, and breathe steadily.",
        "duration_seconds": 30,
        "focus_area": "Full Body",
        "mood_tags": ["low_energy", "stressed"],
        "energy_level": "Low",
        "contraindications": "Practice within your comfort level and use support if balance is difficult.",
        "modifications": "Practice near a wall for additional balance support.",
        "image_url": "",
        "video_url": "",
        "video_type": "youtube",
    },

    {
        "name": "Vrikshasana",
        "sanskrit_name": "Vrikshasana",
        "short_description": "A standing balance posture that develops stability and concentration.",
        "category": "Balance",
        "difficulty": "Beginner",
        "benefits": "Supports balance, concentration, posture, and lower-body stability.",
        "instructions": "Stand tall, shift weight onto one foot, place the other foot in a comfortable supported position, and maintain steady breathing.",
        "duration_seconds": 30,
        "focus_area": "Legs & Balance",
        "mood_tags": ["low_energy"],
        "energy_level": "Moderate",
        "contraindications": "Use support if you have difficulty maintaining balance.",
        "modifications": "Keep the toes of the raised foot on the floor for a lighter variation.",
        "image_url": "",
        "video_url": "",
        "video_type": "youtube",
    },

    {
        "name": "Trikonasana",
        "sanskrit_name": "Trikonasana",
        "short_description": "A standing posture combining lateral movement with active leg engagement.",
        "category": "Standing",
        "difficulty": "Beginner",
        "benefits": "Encourages mobility through the hips, legs, and side body.",
        "instructions": "Take a comfortable wide stance, extend the arms, and gently lengthen the torso sideways while keeping the movement controlled.",
        "duration_seconds": 30,
        "focus_area": "Hips & Side Body",
        "mood_tags": [],
        "energy_level": "Moderate",
        "contraindications": "Avoid forcing the range of motion.",
        "modifications": "Place the lower hand on a yoga block or elevated surface.",
        "image_url": "",
        "video_url": "",
        "video_type": "youtube",
    },

    {
        "name": "Virabhadrasana I",
        "sanskrit_name": "Virabhadrasana I",
        "short_description": "A standing posture that combines strength, stability, and focused breathing.",
        "category": "Standing",
        "difficulty": "Beginner",
        "benefits": "Builds lower-body strength and encourages stability and body awareness.",
        "instructions": "Step one foot forward, bend the front knee comfortably, ground through the feet, and lengthen the spine.",
        "duration_seconds": 30,
        "focus_area": "Legs & Core",
        "mood_tags": [],
        "energy_level": "Moderate",
        "contraindications": "Keep the stance comfortable and avoid painful knee or hip positions.",
        "modifications": "Use a shorter stance and reduce the knee bend.",
        "image_url": "",
        "video_url": "",
        "video_type": "youtube",
    },

    {
        "name": "Virabhadrasana II",
        "sanskrit_name": "Virabhadrasana II",
        "short_description": "A standing posture emphasizing leg strength, stability, and awareness.",
        "category": "Standing",
        "difficulty": "Beginner",
        "benefits": "Supports leg strength, balance, and mindful movement.",
        "instructions": "Take a wide stance, turn one foot outward, bend the front knee comfortably, and extend the arms.",
        "duration_seconds": 30,
        "focus_area": "Legs & Hips",
        "mood_tags": [],
        "energy_level": "Moderate",
        "contraindications": "Avoid forcing the front knee or hip position.",
        "modifications": "Reduce the depth of the front knee bend.",
        "image_url": "",
        "video_url": "",
        "video_type": "youtube",
    },

    {
        "name": "Balasana",
        "sanskrit_name": "Balasana",
        "short_description": "A gentle resting posture commonly used for relaxation and recovery.",
        "category": "Relaxation",
        "difficulty": "Beginner",
        "benefits": "Encourages relaxation and a gentle release through the body.",
        "instructions": "From a kneeling position, lower the hips toward the heels and gently bring the torso forward.",
        "duration_seconds": 60,
        "focus_area": "Back & Hips",
        "mood_tags": ["anxious", "stressed", "cramping"],
        "energy_level": "Low",
        "contraindications": "Choose a comfortable position and avoid pressure that causes discomfort.",
        "modifications": "Place a cushion beneath the hips or torso for additional support.",
        "image_url": "",
        "video_url": "",
        "video_type": "youtube",
    },

    {
        "name": "Bhujangasana",
        "sanskrit_name": "Bhujangasana",
        "short_description": "A gentle backbend practiced with controlled movement and mindful breathing.",
        "category": "Backbend",
        "difficulty": "Beginner",
        "benefits": "Encourages spinal extension and awareness through the front body.",
        "instructions": "Lie on the abdomen, place the hands comfortably, and gently lift the chest while keeping the movement controlled.",
        "duration_seconds": 30,
        "focus_area": "Back & Chest",
        "mood_tags": ["sore", "low_energy"],
        "energy_level": "Moderate",
        "contraindications": "Avoid forcing spinal extension or practicing through pain.",
        "modifications": "Keep the lift low and focus on length rather than height.",
        "image_url": "",
        "video_url": "",
        "video_type": "youtube",
    },

    {
        "name": "Sukhasana",
        "sanskrit_name": "Sukhasana",
        "short_description": "A comfortable seated posture for breathing, mindfulness, and gentle stillness.",
        "category": "Seated",
        "difficulty": "Beginner",
        "benefits": "Supports comfortable seated breathing and mindful awareness.",
        "instructions": "Sit comfortably with the legs crossed, lengthen the spine, relax the shoulders, and breathe naturally.",
        "duration_seconds": 60,
        "focus_area": "Hips & Spine",
        "mood_tags": [],
        "energy_level": "Low",
        "contraindications": "Choose a comfortable seated position.",
        "modifications": "Sit on a cushion or folded blanket to raise the hips.",
        "image_url": "",
        "video_url": "",
        "video_type": "youtube",
    },

    {
        "name": "Setu Bandhasana",
        "sanskrit_name": "Setu Bandhasana",
        "short_description": "A supported bridge posture that combines gentle strengthening with controlled movement.",
        "category": "Backbend",
        "difficulty": "Beginner",
        "benefits": "Engages the lower body and encourages awareness through the spine and hips.",
        "instructions": "Lie on your back with knees bent, feet grounded, and gently lift the hips while maintaining controlled breathing.",
        "duration_seconds": 30,
        "focus_area": "Hips & Core",
        "mood_tags": [],
        "energy_level": "Moderate",
        "contraindications": "Avoid painful movement and keep the range comfortable.",
        "modifications": "Use a smaller lift or practice a supported variation.",
        "image_url": "",
        "video_url": "",
        "video_type": "youtube",
    },

    {
        "name": "Marjaryasana",
        "sanskrit_name": "Marjaryasana",
        "short_description": "A gentle spinal movement performed from a hands-and-knees position.",
        "category": "Mobility",
        "difficulty": "Beginner",
        "benefits": "Encourages gentle spinal mobility and body awareness.",
        "instructions": "Begin on hands and knees and slowly round the spine while coordinating the movement with comfortable breathing.",
        "duration_seconds": 30,
        "focus_area": "Spine",
        "mood_tags": ["sore", "stressed", "wired"],
        "energy_level": "Moderate",
        "contraindications": "Use a comfortable range and avoid painful wrist or knee positions.",
        "modifications": "Place padding under the knees or reduce the movement range.",
        "image_url": "",
        "video_url": "",
        "video_type": "youtube",
    },

    {
        "name": "Bitilasana",
        "sanskrit_name": "Bitilasana",
        "short_description": "A gentle spinal extension movement often paired with Cat Pose.",
        "category": "Mobility",
        "difficulty": "Beginner",
        "benefits": "Supports gentle spinal movement and coordination with breath.",
        "instructions": "From hands and knees, gently lengthen the spine and open through the front body without forcing the movement.",
        "duration_seconds": 30,
        "focus_area": "Spine & Chest",
        "mood_tags": [],
        "energy_level": "Moderate",
        "contraindications": "Avoid excessive spinal extension.",
        "modifications": "Use a smaller range of motion.",
        "image_url": "",
        "video_url": "",
        "video_type": "youtube",
    },

    {
        "name": "Adho Mukha Svanasana",
        "sanskrit_name": "Adho Mukha Svanasana",
        "short_description": "A familiar yoga posture combining active support through the hands and legs.",
        "category": "Inversion",
        "difficulty": "Beginner",
        "benefits": "Encourages whole-body engagement and mobility through the back body.",
        "instructions": "From hands and knees, lift the hips upward while maintaining a comfortable spine and steady breathing.",
        "duration_seconds": 30,
        "focus_area": "Full Body",
        "mood_tags": [],
        "energy_level": "Moderate",
        "contraindications": "Modify or skip if the position causes discomfort.",
        "modifications": "Keep the knees bent and reduce the depth of the posture.",
        "image_url": "",
        "video_url": "",
        "video_type": "youtube",
    },

    {
        "name": "Paschimottanasana",
        "sanskrit_name": "Paschimottanasana",
        "short_description": "A seated forward-folding posture practiced with a long, comfortable spine.",
        "category": "Forward Bend",
        "difficulty": "Intermediate",
        "benefits": "Encourages gentle mobility through the back body and legs.",
        "instructions": "Sit with the legs extended and gently hinge forward from the hips without forcing the stretch.",
        "duration_seconds": 45,
        "focus_area": "Hamstrings & Back",
        "mood_tags": [],
        "energy_level": "Low",
        "contraindications": "Avoid forcing the forward fold.",
        "modifications": "Bend the knees or use a strap for support.",
        "image_url": "",
        "video_url": "",
        "video_type": "youtube",
    },

    {
        "name": "Baddha Konasana",
        "sanskrit_name": "Baddha Konasana",
        "short_description": "A seated posture that encourages comfortable hip mobility.",
        "category": "Hip Opener",
        "difficulty": "Beginner",
        "benefits": "Supports gentle hip mobility and relaxed seated movement.",
        "instructions": "Bring the soles of the feet together and allow the knees to move outward comfortably.",
        "duration_seconds": 45,
        "focus_area": "Hips",
        "mood_tags": [],
        "energy_level": "Low",
        "contraindications": "Do not force the knees downward.",
        "modifications": "Place cushions beneath the knees for support.",
        "image_url": "",
        "video_url": "",
        "video_type": "youtube",
    },

    {
        "name": "Ardha Matsyendrasana",
        "sanskrit_name": "Ardha Matsyendrasana",
        "short_description": "A seated spinal rotation practiced with controlled movement.",
        "category": "Twist",
        "difficulty": "Intermediate",
        "benefits": "Encourages comfortable rotational mobility through the spine.",
        "instructions": "Sit upright and gently rotate the torso while keeping the movement controlled and comfortable.",
        "duration_seconds": 30,
        "focus_area": "Spine",
        "mood_tags": [],
        "energy_level": "Moderate",
        "contraindications": "Avoid forcing spinal rotation.",
        "modifications": "Use a smaller rotation and keep the spine comfortably long.",
        "image_url": "",
        "video_url": "",
        "video_type": "youtube",
    },

    {
        "name": "Savasana",
        "sanskrit_name": "Savasana",
        "short_description": "A resting posture used to support relaxation and mindful recovery.",
        "category": "Relaxation",
        "difficulty": "Beginner",
        "benefits": "Encourages relaxation, stillness, and recovery after practice.",
        "instructions": "Lie comfortably on your back, allow the body to relax, and breathe naturally.",
        "duration_seconds": 120,
        "focus_area": "Full Body",
        "mood_tags": ["anxious", "stressed", "wired", "low_energy"],
        "energy_level": "Low",
        "contraindications": "Choose another comfortable resting position if lying on the back is unsuitable.",
        "modifications": "Place a cushion beneath the knees for additional comfort.",
        "image_url": "",
        "video_url": "",
        "video_type": "youtube",
    },

    {
        "name": "Anjaneyasana",
        "sanskrit_name": "Anjaneyasana",
        "short_description": "A gentle lunge posture that encourages mobility through the hips and legs.",
        "category": "Hip Opener",
        "difficulty": "Beginner",
        "benefits": "Supports hip mobility, balance, and lower-body awareness.",
        "instructions": "Step one foot forward and lower the opposite knee comfortably while keeping the torso upright.",
        "duration_seconds": 30,
        "focus_area": "Hips & Legs",
        "mood_tags": [],
        "energy_level": "Moderate",
        "contraindications": "Keep the movement comfortable around the knees and hips.",
        "modifications": "Place padding beneath the back knee.",
        "image_url": "",
        "video_url": "",
        "video_type": "youtube",
    },

    {
        "name": "Utkatasana",
        "sanskrit_name": "Utkatasana",
        "short_description": "A standing posture that develops lower-body engagement and stability.",
        "category": "Strength",
        "difficulty": "Beginner",
        "benefits": "Builds awareness and strength through the legs and core.",
        "instructions": "Stand with the feet grounded, bend the knees comfortably, and lower the hips while maintaining a long spine.",
        "duration_seconds": 30,
        "focus_area": "Legs & Core",
        "mood_tags": [],
        "energy_level": "Moderate",
        "contraindications": "Avoid uncomfortable knee or hip positions.",
        "modifications": "Use a smaller knee bend or practice near a wall.",
        "image_url": "",
        "video_url": "",
        "video_type": "youtube",
    },

    {
        "name": "Garudasana",
        "sanskrit_name": "Garudasana",
        "short_description": "A balance posture combining concentration with coordinated positioning.",
        "category": "Balance",
        "difficulty": "Intermediate",
        "benefits": "Challenges balance, coordination, and concentration.",
        "instructions": "Stand steadily and gradually explore the crossed-leg and arm positions while maintaining comfortable breathing.",
        "duration_seconds": 30,
        "focus_area": "Balance & Focus",
        "mood_tags": [],
        "energy_level": "Moderate",
        "contraindications": "Use support if balance is uncertain.",
        "modifications": "Keep the toes of the raised foot lightly touching the floor.",
        "image_url": "",
        "video_url": "",
        "video_type": "youtube",
    },

    {
        "name": "Matsyasana",
        "sanskrit_name": "Matsyasana",
        "short_description": "A reclining posture involving gentle opening through the front body.",
        "category": "Backbend",
        "difficulty": "Intermediate",
        "benefits": "Encourages awareness through the chest and upper body.",
        "instructions": "Settle into a supported reclining position and gently open through the front body without forcing the neck.",
        "duration_seconds": 30,
        "focus_area": "Chest & Upper Back",
        "mood_tags": [],
        "energy_level": "Moderate",
        "contraindications": "Avoid uncomfortable neck or back positions.",
        "modifications": "Practice with supportive cushions rather than forcing the posture.",
        "image_url": "",
        "video_url": "",
        "video_type": "youtube",
    },
]


# ============================================================
# PRANAYAMA DATA
# ============================================================

PRANAYAMAS = [
    {
        "name": "Nadi Shodhana",
        "sanskrit_name": "Nadi Shodhana Pranayama",
        "short_description": "A gentle alternate-nostril breathing practice for calm and mindful breathing.",
        "difficulty": "Beginner",
        "benefits": "Encourages calm breathing, relaxation, and focused awareness.",
        "instructions": "Sit comfortably with a relaxed posture. Practice slow alternate-nostril breathing without forcing the breath.",
        "duration_seconds": 300,
        "breathing_pattern": "Alternate nostril breathing",
        "focus_area": "Breath & Relaxation",
        "mood_tags": ["anxious", "stressed"],
        "contraindications": "Stop if you feel dizzy, uncomfortable, or short of breath.",
        "modifications": "Begin with natural breathing and avoid breath retention.",
        "image_url": "",
        "video_url": "",
        "video_type": "youtube",
    },

    {
        "name": "Bhramari",
        "sanskrit_name": "Bhramari Pranayama",
        "short_description": "A calming breathing practice that uses a gentle humming sound during exhalation.",
        "difficulty": "Beginner",
        "benefits": "Encourages relaxation, quiet focus, and mindful breathing.",
        "instructions": "Sit comfortably, inhale gently, and exhale slowly while producing a soft humming sound.",
        "duration_seconds": 180,
        "breathing_pattern": "Slow inhale with humming exhalation",
        "focus_area": "Relaxation & Focus",
        "mood_tags": ["anxious", "stressed", "wired"],
        "contraindications": "Practice gently and stop if the sound or breathing causes discomfort.",
        "modifications": "Keep the humming soft and practice for a shorter duration.",
        "image_url": "",
        "video_url": "",
        "video_type": "youtube",
    },

    {
        "name": "Diaphragmatic Breathing",
        "sanskrit_name": "Dirgha Pranayama",
        "short_description": "A gentle breathing practice emphasizing relaxed and comfortable abdominal breathing.",
        "difficulty": "Beginner",
        "benefits": "Encourages slow breathing, relaxation, and awareness of the breath.",
        "instructions": "Sit or lie comfortably. Allow the abdomen to expand gently during inhalation and relax during exhalation.",
        "duration_seconds": 300,
        "breathing_pattern": "Slow diaphragmatic breathing",
        "focus_area": "Breath Awareness",
        "mood_tags": ["anxious", "stressed", "low_energy"],
        "contraindications": "Keep breathing comfortable and avoid forcing deep breaths.",
        "modifications": "Practice for a shorter duration if you are new to breathwork.",
        "image_url": "",
        "video_url": "",
        "video_type": "youtube",
    },

    {
        "name": "Ujjayi",
        "sanskrit_name": "Ujjayi Pranayama",
        "short_description": "A controlled breathing practice commonly used during yoga practice.",
        "difficulty": "Intermediate",
        "benefits": "Supports breath awareness, concentration, and controlled breathing.",
        "instructions": "Breathe slowly through the nose while gently narrowing the throat to create a soft ocean-like sound.",
        "duration_seconds": 180,
        "breathing_pattern": "Slow nasal breathing",
        "focus_area": "Breath & Focus",
        "mood_tags": ["stressed", "low_energy"],
        "contraindications": "Do not strain the throat or force the breath.",
        "modifications": "Use a very soft breath sound and keep the breathing natural.",
        "image_url": "",
        "video_url": "",
        "video_type": "youtube",
    },

    {
        "name": "Sheetali",
        "sanskrit_name": "Sheetali Pranayama",
        "short_description": "A traditional cooling breathing practice performed with controlled inhalation and slow exhalation.",
        "difficulty": "Intermediate",
        "benefits": "Encourages mindful breathing and a cooling sensation.",
        "instructions": "Practice the technique gently and follow a comfortable breathing rhythm without forcing the breath.",
        "duration_seconds": 180,
        "breathing_pattern": "Cooling inhalation with slow exhalation",
        "focus_area": "Breath & Cooling",
        "mood_tags": ["wired", "stressed"],
        "contraindications": "Avoid practicing if the breathing method causes discomfort.",
        "modifications": "Use a comfortable breathing variation rather than forcing the technique.",
        "image_url": "",
        "video_url": "",
        "video_type": "youtube",
    },

    {
        "name": "Kapalabhati",
        "sanskrit_name": "Kapalabhati Pranayama",
        "short_description": "A more active breathing practice involving rhythmic forceful exhalations.",
        "difficulty": "Advanced",
        "benefits": "Can support breath awareness and active breathing practice.",
        "instructions": "Practice only when comfortable with the technique. Use gentle rhythmic exhalations and allow inhalation to occur naturally.",
        "duration_seconds": 60,
        "breathing_pattern": "Active exhalation with passive inhalation",
        "focus_area": "Breath & Energy",
        "mood_tags": ["low_energy"],
        "contraindications": "Not suitable for everyone. Stop if you feel dizzy or uncomfortable.",
        "modifications": "Practice only with appropriate instruction and use a gentle pace.",
        "image_url": "",
        "video_url": "",
        "video_type": "youtube",
    },

    {
        "name": "Chandra Bhedana",
        "sanskrit_name": "Chandra Bhedana Pranayama",
        "short_description": "A breathing practice traditionally performed using alternate nostril breathing with emphasis on the left nostril.",
        "difficulty": "Intermediate",
        "benefits": "Encourages slow, focused breathing and relaxation.",
        "instructions": "Practice gently with comfortable breathing and avoid forcing the breath or holding it for long periods.",
        "duration_seconds": 180,
        "breathing_pattern": "Left-nostril focused breathing",
        "focus_area": "Relaxation & Breath",
        "mood_tags": ["stressed", "wired"],
        "contraindications": "Stop if you experience discomfort, dizziness, or difficulty breathing.",
        "modifications": "Practice without breath retention and keep the breathing gentle.",
        "image_url": "",
        "video_url": "",
        "video_type": "youtube",
    },

    {
        "name": "Sama Vritti",
        "sanskrit_name": "Sama Vritti Pranayama",
        "short_description": "A balanced breathing practice using equal-duration inhalation and exhalation.",
        "difficulty": "Beginner",
        "benefits": "Encourages steady breathing, focus, and relaxation.",
        "instructions": "Inhale comfortably for a chosen count and exhale for the same count without straining.",
        "duration_seconds": 180,
        "breathing_pattern": "Equal inhale and exhale",
        "focus_area": "Balance & Focus",
        "mood_tags": ["anxious", "stressed"],
        "contraindications": "Do not force the breathing count or hold the breath if uncomfortable.",
        "modifications": "Start with a short and comfortable count such as 3 seconds in and 3 seconds out.",
        "image_url": "",
        "video_url": "",
        "video_type": "youtube",
    },
]


# ============================================================
# MANAGEMENT COMMAND
# ============================================================

class Command(BaseCommand):
    help = "Seed the database with yoga asanas and pranayama"

    def handle(self, *args, **options):

        # ====================================================
        # SEED ASANAS
        # ====================================================

        asana_created_count = 0
        asana_updated_count = 0

        self.stdout.write("Seeding Asanas...")

        for data in ASANAS:
            asana, created = Asana.objects.update_or_create(
                name=data["name"],
                defaults=data,
            )

            if created:
                asana_created_count += 1
            else:
                asana_updated_count += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"Asanas: {asana_created_count} created, "
                f"{asana_updated_count} updated."
            )
        )

        # ====================================================
        # SEED PRANAYAMA
        # ====================================================

        pranayama_created_count = 0
        pranayama_updated_count = 0

        self.stdout.write("Seeding Pranayama...")

        for data in PRANAYAMAS:
            pranayama, created = Pranayama.objects.update_or_create(
                name=data["name"],
                defaults=data,
            )

            if created:
                pranayama_created_count += 1
            else:
                pranayama_updated_count += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"Pranayama: {pranayama_created_count} created, "
                f"{pranayama_updated_count} updated."
            )
        )

        # ====================================================
        # FINAL MESSAGE
        # ====================================================

        self.stdout.write(
            self.style.SUCCESS(
                "Yoga seed completed successfully."
            )
        )