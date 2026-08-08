import json
from pathlib import Path
from typing import Optional

# Paths
BASE_DIR = Path(__file__).resolve().parent
CURRICULUM_PATH = BASE_DIR / "curriculum.json"
CANDIDATES_PATH = BASE_DIR / "candidates.json"

def load_curriculum() -> dict:
    with open(CURRICULUM_PATH, "r") as f:
        return json.load(f)

def load_candidates() -> dict:
    with open(CANDIDATES_PATH, "r") as f:
        return {c["member"]["id"]: c for c in json.load(f)["candidates"]}

def get_day_data(day_number: int, curriculum: dict) -> Optional[dict]:
    for day in curriculum["days"]:
        if day["day"] == day_number:
            return day
    return None

def build_candidate_context(candidate: dict) -> str:
    """Generate a detailed textual summary of the candidate's learning history."""
    member = candidate.get("member", {})
    missions = candidate.get("missions", [])
    signals = candidate.get("signals", {})

    passed = []
    failed = []
    skipped = []

    for m in missions:
        title = f"Day {m['day']} - {m['title']}"
        if m.get("skipped"):
            skipped.append(title)
        elif m.get("passed"):
            attempts = m.get("attempts", 1)
            passed.append(f"{title} (passed in {attempts} attempt{'s' if attempts > 1 else ''})")
        else:
            attempts = m.get("attempts", 1)
            failed.append(f"{title} (failed after {attempts} attempt{'s' if attempts > 1 else ''})")

    context = (
        f"Candidate: {member.get('name', 'Unknown')}\n"
        f"Role: {member.get('jobRole', 'Software Engineer')}\n"
        f"Experience: {member.get('yearsExperience', 0)} years\n"
        f"Education: {member.get('education', 'N/A')}\n\n"
        f"Completed missions:\n  " + ("\n  ".join(passed) if passed else "None") + "\n\n"
        f"Failed missions:\n  " + ("\n  ".join(failed) if failed else "None") + "\n\n"
        f"Skipped missions:\n  " + ("\n  ".join(skipped) if skipped else "None") + "\n\n"
        f"Signals: commitDays={signals.get('commitDays')}, "
        f"missionsCompleted={signals.get('missionsCompleted')}, "
        f"missionsFirstTry={signals.get('missionsFirstTry')}"
    )
    return context

def choose_starting_topic(candidate: dict, curriculum: dict) -> dict:
    """
    Pick the first topic to test.
    Logic: prefer a skipped or failed mission; otherwise the first mission overall; fallback day 1.
    """
    missions = candidate.get("missions", [])
    # Find first skipped mission
    for m in missions:
        if m.get("skipped"):
            day_data = get_day_data(m["day"], curriculum)
            if day_data:
                return day_data
    # Find first failed mission
    for m in missions:
        if not m.get("passed") and not m.get("skipped"):
            day_data = get_day_data(m["day"], curriculum)
            if day_data:
                return day_data
    # Fallback to first mission
    if missions:
        day_data = get_day_data(missions[0]["day"], curriculum)
        if day_data:
            return day_data
    # Ultimate fallback
    return get_day_data(1, curriculum)
