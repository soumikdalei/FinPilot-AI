def validate_response(data):
    if not isinstance(data, dict):
        return fallback()

    if "overall_score" not in data:
        return fallback()

    return data


def fallback():
    return {
        "overall_score": 50,
        "summary": "Fallback response",
        "dimensions": {}
    }