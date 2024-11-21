package utils

import (
	"regexp"
	"strings"
)

func ToKebabCase(str string) string {
    str = strings.ToLower(str)
    str = strings.ReplaceAll(str, " ", "-")
    str = strings.ReplaceAll(str, "_", "-")
    re := regexp.MustCompile(`[^a-z0-9-]+`)
    str = re.ReplaceAllString(str, "")
    str = strings.Trim(str, "-")

    return str
}