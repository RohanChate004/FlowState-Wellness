from django.core.management.base import BaseCommand
from yoga.models import Asana, Pranayama


# ============================================================
# ASANA DATA
# ============================================================

ASANAS = [

    # ============================================================
    # 1. TADASANA
    # ============================================================
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

        "key_muscles": "Calves\nQuadriceps\nGlutes\nCore muscles\nSpinal erectors",

        "step_by_step": """1. Stand tall with your feet together or hip-width apart.
2. Distribute your weight evenly across both feet.
3. Engage your thighs gently without locking your knees.
4. Lengthen your spine and relax your shoulders.
5. Let your arms rest beside your body or raise them overhead.
6. Keep your core gently engaged and chest open.
7. Keep your gaze forward and breathe slowly.
8. Hold the pose comfortably, then release with control.""",

        "alignment_tips": """Keep the spine long and neutral.
Keep shoulders relaxed and away from the ears.
Distribute weight evenly between both feet.
Keep the knees soft rather than locked.
Keep the head aligned over the shoulders.
Avoid pushing the ribs forward.""",

        "precautions": """Do not force the posture or lock the knees.
Practice near a wall if you have difficulty maintaining balance.
If you feel dizzy or uncomfortable, come out of the pose slowly.
People with balance problems should practice with appropriate support.""",
    },


    # ============================================================
    # 2. VRIKSHASANA
    # ============================================================
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

        "key_muscles": "Calves\nQuadriceps\nGlutes\nCore muscles\nAnkle stabilizers",

        "step_by_step": """1. Stand tall with your feet together.
2. Shift your weight onto one foot.
3. Bend the opposite knee and bring the foot toward the inner leg.
4. Place the foot on the inner thigh or calf, avoiding the knee.
5. Bring your palms together in front of your chest.
6. Lengthen your spine and gently engage your core.
7. Focus your gaze on one fixed point.
8. Breathe slowly and hold comfortably.
9. Repeat on the other side.""",

        "alignment_tips": """Keep the standing foot firmly grounded.
Keep the standing knee soft rather than locked.
Keep the hips level and facing forward.
Keep the spine long and neutral.
Keep the shoulders relaxed.
Avoid placing the raised foot directly on the knee.""",

        "precautions": """Do not place the raised foot directly on the knee.
Practice near a wall if balance is difficult.
Do not force the hip or knee into an uncomfortable position.
Come out of the pose slowly if you feel dizzy or unstable.""",
    },


    # ============================================================
    # 3. TRIKONASANA
    # ============================================================
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

        "key_muscles": "Quadriceps\nHamstrings\nGlutes\nObliques\nCore muscles",

        "step_by_step": """1. Stand with your feet comfortably wide apart.
2. Turn one foot outward while keeping the other foot stable.
3. Extend both arms out to the sides.
4. Lengthen through the spine.
5. Gently reach forward and lower one hand toward the shin or a block.
6. Extend the opposite arm upward.
7. Keep the chest open and breathe steadily.
8. Return to standing with control and repeat on the other side.""",

        "alignment_tips": """Keep both feet firmly grounded.
Keep the front knee comfortably aligned with the foot.
Lengthen the spine rather than collapsing forward.
Keep the chest open.
Avoid forcing the lower hand toward the floor.
Keep the neck relaxed.""",

        "precautions": """Do not force the side bend.
Use a block if reaching the floor causes strain.
Avoid painful hip, knee, or back positions.
Come out slowly if you feel dizzy.""",
    },


    # ============================================================
    # 4. VIRABHADRASANA I
    # ============================================================
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

        "key_muscles": "Quadriceps\nGlutes\nHamstrings\nCalves\nCore muscles",

        "step_by_step": """1. Start in a standing position.
2. Step one foot back into a comfortable stance.
3. Bend the front knee gently.
4. Keep the back foot grounded.
5. Square the hips as comfortably as possible.
6. Raise the arms overhead.
7. Lengthen the spine and engage the core gently.
8. Breathe steadily and hold comfortably.
9. Repeat on the other side.""",

        "alignment_tips": """Keep the front knee aligned with the ankle.
Ground through both feet.
Keep the spine long.
Relax the shoulders away from the ears.
Avoid overextending the lower back.
Keep the movement controlled.""",

        "precautions": """Avoid painful knee or hip positions.
Use a shorter stance if needed.
Do not force the hips to face completely forward.
Reduce the depth of the knee bend if uncomfortable.""",
    },


    # ============================================================
    # 5. VIRABHADRASANA II
    # ============================================================
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

        "key_muscles": "Quadriceps\nGlutes\nHamstrings\nCalves\nCore muscles",

        "step_by_step": """1. Stand with your feet wide apart.
2. Turn one foot outward.
3. Bend the front knee comfortably.
4. Keep the back leg active and grounded.
5. Extend both arms parallel to the floor.
6. Keep your torso upright.
7. Look gently toward the front hand.
8. Breathe steadily and hold.
9. Repeat on the other side.""",

        "alignment_tips": """Keep the front knee aligned with the ankle.
Keep the back leg active.
Keep the torso upright.
Relax the shoulders.
Keep both arms extended without straining.
Keep the feet firmly grounded.""",

        "precautions": """Do not force the front knee.
Reduce the stance width if uncomfortable.
Avoid painful hip positions.
Use a smaller knee bend when needed.""",
    },


    # ============================================================
    # 6. BALASANA
    # ============================================================
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

        "key_muscles": "Lower back\nGlutes\nHip muscles\nShoulders",

        "step_by_step": """1. Begin on your hands and knees.
2. Slowly move your hips toward your heels.
3. Gently lower your torso forward.
4. Rest your forehead comfortably.
5. Extend your arms forward or beside your body.
6. Relax the shoulders and neck.
7. Breathe slowly and comfortably.
8. Return to a seated position slowly.""",

        "alignment_tips": """Keep the neck relaxed.
Allow the spine to lengthen naturally.
Do not force the hips toward the heels.
Keep the shoulders relaxed.
Use support under the torso if needed.""",

        "precautions": """Avoid pressure that causes discomfort.
Use a cushion if the knees or hips feel uncomfortable.
Come out slowly if you feel numbness or pain.""",
    },


    # ============================================================
    # 7. BHUJANGASANA
    # ============================================================
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

        "key_muscles": "Spinal erectors\nGlutes\nChest muscles\nShoulders\nCore muscles",

        "step_by_step": """1. Lie on your stomach with your legs extended.
2. Place your hands near the chest.
3. Keep the elbows close to the body.
4. Gently lift the chest using the back muscles.
5. Keep the pelvis and lower body grounded.
6. Keep the shoulders relaxed.
7. Breathe slowly and avoid forcing the lift.
8. Lower the chest with control.""",

        "alignment_tips": """Keep the shoulders away from the ears.
Keep the elbows comfortably close to the body.
Lengthen the spine rather than lifting as high as possible.
Keep the legs active.
Avoid compressing the lower back.""",

        "precautions": """Avoid forcing spinal extension.
Do not practice through back pain.
Keep the movement gentle.
Use a smaller lift if necessary.""",
    },


    # ============================================================
    # 8. SUKHASANA
    # ============================================================
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

        "key_muscles": "Core muscles\nSpinal erectors\nHip muscles",

        "step_by_step": """1. Sit comfortably with your legs crossed.
2. Place your hands on your thighs or knees.
3. Lengthen the spine upward.
4. Relax the shoulders.
5. Keep the chin neutral.
6. Close the eyes if comfortable.
7. Breathe naturally and slowly.
8. Remain still for the desired duration.""",

        "alignment_tips": """Keep the spine long.
Keep the pelvis comfortably supported.
Relax the shoulders.
Keep the head aligned over the spine.
Avoid collapsing the chest.""",

        "precautions": """Use a cushion if the hips or knees feel uncomfortable.
Do not force the knees toward the floor.
Change position if numbness or discomfort develops.""",
    },


    # ============================================================
    # 9. SETU BANDHASANA
    # ============================================================
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

        "key_muscles": "Glutes\nHamstrings\nQuadriceps\nCore muscles\nSpinal erectors",

        "step_by_step": """1. Lie on your back with your knees bent.
2. Place your feet firmly on the floor.
3. Keep the feet approximately hip-width apart.
4. Press gently through the feet.
5. Lift the hips comfortably.
6. Keep the shoulders and upper back grounded.
7. Breathe slowly while holding.
8. Lower the hips with control.""",

        "alignment_tips": """Keep the knees aligned with the feet.
Keep the feet grounded.
Avoid turning the knees outward.
Keep the neck relaxed.
Lift only as high as comfortable.""",

        "precautions": """Avoid painful movement.
Do not overarch the lower back.
Use a smaller lift if needed.
Lower down slowly.""",
    },


    # ============================================================
    # 10. MARJARYASANA
    # ============================================================
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

        "key_muscles": "Core muscles\nSpinal erectors\nShoulders\nBack muscles",

        "step_by_step": """1. Begin on hands and knees.
2. Place hands beneath the shoulders.
3. Place knees beneath the hips.
4. Slowly round the spine upward.
5. Gently draw the abdomen inward.
6. Relax the neck.
7. Breathe steadily.
8. Return to a neutral spine with control.""",

        "alignment_tips": """Keep wrists under the shoulders.
Keep knees under the hips.
Move the spine smoothly.
Keep the neck relaxed.
Avoid forcing the rounding movement.""",

        "precautions": """Use padding if the knees are uncomfortable.
Reduce the range if the wrists hurt.
Stop if spinal movement causes pain.""",
    },


    # ============================================================
    # 11. BITILASANA
    # ============================================================
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

        "key_muscles": "Spinal erectors\nCore muscles\nChest muscles\nShoulders",

        "step_by_step": """1. Begin on hands and knees.
2. Align the wrists under the shoulders.
3. Align the knees under the hips.
4. Gently lengthen the spine.
5. Open the chest forward.
6. Keep the shoulders relaxed.
7. Breathe slowly.
8. Return to a neutral spine.""",

        "alignment_tips": """Keep the hands firmly grounded.
Keep the knees under the hips.
Lengthen rather than compress the lower back.
Keep the shoulders relaxed.
Keep the neck comfortable.""",

        "precautions": """Avoid excessive spinal extension.
Do not force the chest upward.
Use a smaller movement if the lower back feels strained.""",
    },


    # ============================================================
    # 12. ADHO MUKHA SVANASANA
    # ============================================================
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

        "key_muscles": "Shoulders\nHamstrings\nCalves\nGlutes\nCore muscles",

        "step_by_step": """1. Begin on hands and knees.
2. Tuck the toes under.
3. Lift the hips upward.
4. Lengthen the spine.
5. Keep the knees slightly bent if needed.
6. Press through the hands.
7. Keep the head relaxed between the arms.
8. Breathe steadily and hold comfortably.""",

        "alignment_tips": """Keep the spine long.
Keep the hands firmly grounded.
Avoid forcing the heels toward the floor.
Keep the shoulders away from the ears.
Bend the knees when needed.""",

        "precautions": """Modify if the posture causes discomfort.
Avoid forcing the hamstrings or calves.
Use bent knees if the back rounds excessively.""",
    },


    # ============================================================
    # 13. PASCHIMOTTANASANA
    # ============================================================
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

        "key_muscles": "Hamstrings\nCalves\nSpinal erectors\nGlutes",

        "step_by_step": """1. Sit with your legs extended forward.
2. Keep the spine comfortably long.
3. Flex the feet gently.
4. Hinge forward from the hips.
5. Reach toward the legs without forcing.
6. Keep the shoulders relaxed.
7. Breathe slowly.
8. Return upright with control.""",

        "alignment_tips": """Lead with the chest rather than rounding aggressively.
Keep the spine comfortable.
Keep the knees soft if needed.
Relax the shoulders.
Avoid pulling yourself deeper.""",

        "precautions": """Do not force the forward fold.
Bend the knees if the hamstrings feel tight.
Stop if you experience sharp back pain.""",
    },


    # ============================================================
    # 14. BADDHA KONASANA
    # ============================================================
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

        "key_muscles": "Inner thighs\nHip muscles\nGroin muscles\nCore muscles",

        "step_by_step": """1. Sit comfortably with the legs extended.
2. Bring the soles of the feet together.
3. Hold the feet gently with the hands.
4. Allow the knees to move outward naturally.
5. Lengthen the spine.
6. Relax the shoulders.
7. Breathe slowly.
8. Hold without forcing the knees downward.""",

        "alignment_tips": """Keep the spine long.
Keep the feet comfortably together.
Allow the knees to move naturally.
Avoid rounding the back.
Keep the shoulders relaxed.""",

        "precautions": """Do not force the knees downward.
Use cushions beneath the knees if needed.
Stop if there is pain in the hips or knees.""",
    },


    # ============================================================
    # 15. ARDHA MATSYENDRASANA
    # ============================================================
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

        "key_muscles": "Obliques\nCore muscles\nSpinal erectors\nHip muscles",

        "step_by_step": """1. Sit upright with the legs comfortably positioned.
2. Bend one knee and place the foot securely.
3. Lengthen the spine.
4. Place the opposite arm around the knee.
5. Gently rotate the torso.
6. Keep the movement controlled.
7. Breathe steadily.
8. Return to center and repeat on the other side.""",

        "alignment_tips": """Lengthen the spine before rotating.
Rotate gradually rather than forcing.
Keep the shoulders relaxed.
Keep the hips grounded.
Keep the neck comfortable.""",

        "precautions": """Avoid forcing spinal rotation.
Use a smaller range if necessary.
Stop if you feel pain or discomfort in the spine.""",
    },


    # ============================================================
    # 16. SAVASANA
    # ============================================================
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

        "key_muscles": "Full body relaxation\nBreathing muscles\nCore muscles",

        "step_by_step": """1. Lie comfortably on your back.
2. Extend the legs naturally.
3. Allow the arms to rest beside the body.
4. Relax the shoulders and jaw.
5. Close the eyes if comfortable.
6. Allow the breath to become natural.
7. Notice the body becoming still.
8. Remain relaxed for the desired duration.""",

        "alignment_tips": """Keep the spine comfortably neutral.
Allow the feet to relax outward.
Keep the shoulders relaxed.
Support the knees if necessary.
Keep the neck comfortable.""",

        "precautions": """Choose another resting position if lying on the back is unsuitable.
Use cushions for additional support.
Rise slowly when finishing the practice.""",
    },


    # ============================================================
    # 17. ANJANEYASANA
    # ============================================================
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

        "key_muscles": "Quadriceps\nHip flexors\nGlutes\nHamstrings\nCore muscles",

        "step_by_step": """1. Begin in a standing position.
2. Step one foot forward.
3. Lower the back knee toward the floor.
4. Keep the front knee comfortably aligned.
5. Lift the torso upright.
6. Raise the arms if comfortable.
7. Keep the hips relaxed and breathe steadily.
8. Repeat on the other side.""",

        "alignment_tips": """Keep the front knee aligned with the ankle.
Support the back knee with padding.
Keep the torso upright.
Avoid pushing the front knee too far forward.
Keep the hips comfortable.""",

        "precautions": """Use padding beneath the back knee.
Avoid painful knee or hip positions.
Reduce the depth of the lunge if necessary.""",
    },


    # ============================================================
    # 18. UTKATASANA
    # ============================================================
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

        "key_muscles": "Quadriceps\nGlutes\nHamstrings\nCore muscles\nCalves",

        "step_by_step": """1. Stand with your feet comfortably grounded.
2. Bend the knees gently.
3. Lower the hips as if sitting into a chair.
4. Keep the chest lifted.
5. Extend the arms forward or overhead.
6. Engage the core gently.
7. Keep the weight balanced through the feet.
8. Hold and breathe steadily.""",

        "alignment_tips": """Keep the knees aligned with the feet.
Keep the chest open.
Keep the spine long.
Avoid shifting all weight into the toes.
Relax the shoulders.""",

        "precautions": """Avoid painful knee or hip positions.
Use a smaller bend if needed.
Practice near a wall if balance is difficult.""",
    },


    # ============================================================
    # 19. GARUDASANA
    # ============================================================
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

        "key_muscles": "Quadriceps\nGlutes\nCalves\nCore muscles\nShoulders",

        "step_by_step": """1. Stand tall with your feet grounded.
2. Shift your weight onto one foot.
3. Cross the opposite leg over the standing leg.
4. Bend the standing knee slightly.
5. Cross the arms in front of the body.
6. Maintain a steady gaze.
7. Breathe slowly and hold.
8. Unwind carefully and repeat on the other side.""",

        "alignment_tips": """Keep the standing foot grounded.
Keep the standing knee comfortably bent.
Keep the spine upright.
Keep the gaze steady.
Avoid forcing the leg or arm position.""",

        "precautions": """Use support if balance is uncertain.
Keep the raised toes on the floor for a lighter variation.
Avoid forcing the knees or hips.""",
    },


    # ============================================================
    # 20. MATSYASANA
    # ============================================================
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

        "key_muscles": "Chest muscles\nShoulders\nSpinal erectors\nCore muscles",

        "step_by_step": """1. Lie comfortably on your back.
2. Position the legs in a comfortable supported position.
3. Gently open the chest.
4. Use support beneath the upper back if needed.
5. Keep the neck relaxed.
6. Breathe slowly.
7. Hold the posture comfortably.
8. Return to a neutral resting position slowly.""",

        "alignment_tips": """Keep the neck comfortable.
Avoid excessive pressure on the head.
Open the chest gently.
Keep the shoulders relaxed.
Use support when needed.""",

        "precautions": """Avoid uncomfortable neck or back positions.
Do not force the chest open.
Use cushions for support.
Come out slowly and carefully.""",
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